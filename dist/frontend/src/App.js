"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Navbar_1 = __importDefault(require("./components/Navbar"));
const react_router_dom_1 = require("react-router-dom");
const AdapterMoment_1 = require("@mui/x-date-pickers/AdapterMoment");
const Container_1 = __importDefault(require("@mui/material/Container"));
const react_1 = __importDefault(require("react"));
const RoutesRoot_1 = __importDefault(require("./routes/RoutesRoot"));
const Error404_1 = __importDefault(require("./pages/Error404"));
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const x_date_pickers_1 = require("@mui/x-date-pickers");
const material_1 = require("@mui/material");
const react_2 = require("@emotion/react");
const theme = (0, material_1.createTheme)({});
function App() {
    return (<x_date_pickers_1.LocalizationProvider dateAdapter={AdapterMoment_1.AdapterMoment}>
      <react_2.ThemeProvider theme={theme}>
        <react_router_dom_1.BrowserRouter>
          <material_1.Box className="container vh-100">
            <Navbar_1.default />
            <Container_1.default fixed style={{ margin: "20px" }}>
              <react_router_dom_1.Routes>
                <react_router_dom_1.Route path="/" element={<HomePage_1.default />}/>
                <react_router_dom_1.Route path="/*" element={<RoutesRoot_1.default />}/>
                <react_router_dom_1.Route path="*" element={<Error404_1.default />}/>
              </react_router_dom_1.Routes>
            </Container_1.default>
          </material_1.Box>
        </react_router_dom_1.BrowserRouter>
      </react_2.ThemeProvider>
    </x_date_pickers_1.LocalizationProvider>);
}
exports.default = App;
