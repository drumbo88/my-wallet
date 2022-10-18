"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
exports.default = {
    init(app, config) {
        return app.listen(config.NODE_ENV != 'test' ? config.API_PORT : 0, () => __awaiter(this, void 0, void 0, function* () {
            console.log("AAAAAAAAAAAAAAAA");
            if (config.DB_CONNECTION_STRING) {
                yield (0, database_1.connect)()
                    .catch(err => console.error(err));
            }
            if (config.NODE_ENV != 'test') {
                console.log(`Server online on port ${config.API_PORT}`);
            }
        }));
    },
    close(server, callback) {
        if (server) {
            server.close(callback);
            (0, database_1.close)();
        }
    }
};
