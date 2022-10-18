import app from "../app";
import server from "../server";
import * as config from '../config'

export const testServer = server.init(app, config)
