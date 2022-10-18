import { connect, close as databaseClose } from "./database"

export default {
    init(app, config) {
        return app.listen(config.NODE_ENV != 'test' ? config.API_PORT : 0, async () => {
            console.log("AAAAAAAAAAAAAAAA")
            if (config.DB_CONNECTION_STRING) {
                await connect()
                    .catch(err => console.error(err))
            }
            if (config.NODE_ENV != 'test') {
                console.log(`Server online on port ${config.API_PORT}`)
            }
        })
    },
    close(server, callback?) {
        if (server) {
            server.close(callback)
            databaseClose()
        }
    }
}
