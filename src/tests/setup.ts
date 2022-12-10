//import { AppDataSource } from "../database";
import app from "../app";
import server from "../server";
import * as config from '../config'

export default async () => {
    //console.log("###############################",AppDataSource.manager.connection)
    await server.init(app, config)
};
