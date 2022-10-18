
// ----- Static files -----
//app.use(express.static(path.join(__dirname, 'public')))

import app from "./app"
import * as config from './config'
import server from "./server"

// ----- Settings -----
const PORT = config.NODE_ENV == "test"
    ? (config.API_PORT_TEST || 5001)
    : (config.API_PORT || 5000)

// ########## Starting the server ##########
server.init(app, config)

export default server
