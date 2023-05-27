"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var config_1 = require("../config");
mongoose_1["default"].set('strictQuery', false);
mongoose_1["default"].connect(config_1.DB_CONNECTION_STRING);
var schema = new mongoose_1.Schema({ name: String });
schema.static('myStaticMethod', function myStaticMethod() {
    return 42;
});
var User = (0, mongoose_1.model)('User', schema);
var user = new User({ name: 'drumbo' });
console.log(user.getNombreCompleto());
var answer = User.myStaticMethod(); // 42
