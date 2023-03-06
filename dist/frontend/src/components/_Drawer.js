"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Drawer_1 = __importDefault(require("@mui/material/Drawer"));
const List_1 = __importDefault(require("@mui/material/List"));
const Divider_1 = __importDefault(require("@mui/material/Divider"));
const ListItem_1 = __importDefault(require("@mui/material/ListItem"));
const ListItemIcon_1 = __importDefault(require("@mui/material/ListItemIcon"));
const ListItemText_1 = __importDefault(require("@mui/material/ListItemText"));
const MoveToInbox_1 = __importDefault(require("@mui/icons-material/MoveToInbox"));
const Mail_1 = __importDefault(require("@mui/icons-material/Mail"));
function TemporaryDrawer() {
    const [state, setState] = react_1.default.useState({
        top: false, left: false, bottom: false, right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(Object.assign(Object.assign({}, state), { [anchor]: open }));
    };
    const menuList = [
        'Carga ingreso',
        'Carga gasto',
        'Ver cuentas',
        'Ver productos',
        'Activos',
        'Indicadores',
    ];
    const list = (anchor) => (<Box_1.default sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      <List_1.default>
        {menuList.map((text, index) => (<ListItem_1.default button key={text}>
            <ListItemIcon_1.default>
              {index % 2 === 0 ? <MoveToInbox_1.default /> : <Mail_1.default />}
            </ListItemIcon_1.default>
            <ListItemText_1.default primary={text}/>
          </ListItem_1.default>))}
      </List_1.default>
      <Divider_1.default />
      <List_1.default>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (<ListItem_1.default button key={text}>
            <ListItemIcon_1.default>
              {index % 2 === 0 ? <MoveToInbox_1.default /> : <Mail_1.default />}
            </ListItemIcon_1.default>
            <ListItemText_1.default primary={text}/>
          </ListItem_1.default>))}
      </List_1.default>
    </Box_1.default>);
    return (<div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (<react_1.default.Fragment key={anchor}>
          <Button_1.default variant="contained" onMouseOver={toggleDrawer(anchor, true)}>{anchor}</Button_1.default>
          <Drawer_1.default anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer_1.default>
        </react_1.default.Fragment>))}
    </div>);
}
exports.default = TemporaryDrawer;
