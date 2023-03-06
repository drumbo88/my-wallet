"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function Error404() {
    const location = (0, react_router_dom_1.useLocation)();
    return (<div>Error 404: {location.pathname}</div>);
}
exports.default = Error404;
