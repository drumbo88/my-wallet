import server from "../server";
import { testServer } from "./testServer";

export default async () => {
    server.close(testServer)
};