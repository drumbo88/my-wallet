import { Server } from "http";
import * as database from "./database"

type server = {
    server?: Server,
    init,
    close,
}

export default {
    async init(app, config) {
        const port = config.NODE_ENV != 'test' ? config.API_PORT : 0
        return new Promise((resolve, reject) => {
            this.server = app.listen(port)
              .once('listening', async () => {
                if (config.DB_CONNECTION_STRING) {
                    await database.connect()
                        .then(() => console.log("Data source connected!"))
                        .catch(err => console.error(err))
                }
                if (config.NODE_ENV != 'test') {
                    console.log(`Server online on port ${port}`)
                }
                resolve(this.server)
            })
              .once('error', reject);
        });
    },
    async close(callback?) {
        if (this.server) {
            await this.server.close(callback)
            await database.close()
        }
    }
} as server
