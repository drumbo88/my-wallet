"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_1 = __importDefault(require("react"));
const HomePage_1 = __importDefault(require("../pages/HomePage"));
const ProfilePage_1 = __importDefault(require("../pages/ProfilePage"));
const ConfigPage_1 = __importDefault(require("../pages/ConfigPage"));
const NotificationsPage_1 = __importDefault(require("../pages/NotificationsPage"));
const MessagesPage_1 = __importDefault(require("../pages/MessagesPage"));
const IncomesPage_1 = __importDefault(require("../pages/IncomesPage"));
const CurrenciesPage_1 = __importDefault(require("../pages/CurrenciesPage"));
const CountriesPage_1 = __importDefault(require("../pages/CountriesPage"));
const TransactionsPage_1 = __importDefault(require("../pages/TransactionsPage"));
const PeoplePage_1 = __importDefault(require("../pages/PeoplePage"));
function RoutesRoot() {
    return (<react_router_dom_1.Routes>
        <react_router_dom_1.Route path="" element={<HomePage_1.default />}/>
        <react_router_dom_1.Route path="incomes/*" element={<IncomesPage_1.default />}/>
        <react_router_dom_1.Route path="currencies/*" element={<CurrenciesPage_1.default />}/>
        <react_router_dom_1.Route path="countries/*" element={<CountriesPage_1.default />}/>
        <react_router_dom_1.Route path="transactions/*" element={<TransactionsPage_1.default />}/>
        <react_router_dom_1.Route path="person/:id/transactions/*" element={<TransactionsPage_1.default />}/>
        <react_router_dom_1.Route path="person/*" element={<PeoplePage_1.default />}/>
        <react_router_dom_1.Route path="messages" element={<MessagesPage_1.default />}/>
        <react_router_dom_1.Route path="notifications" element={<NotificationsPage_1.default />}/>
        <react_router_dom_1.Route path="profile" element={<ProfilePage_1.default />}/>
        <react_router_dom_1.Route path="config" element={<ConfigPage_1.default />}/>
    </react_router_dom_1.Routes>);
}
exports.default = RoutesRoot;
