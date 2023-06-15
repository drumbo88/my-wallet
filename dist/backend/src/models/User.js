"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const user_1 = require("common/src/types/user");
const mongoose_1 = require("mongoose");
const database_1 = require("../database");
exports.schema = new mongoose_1.Schema(user_1.UserFields, database_1.defaultSchemaOptions);
