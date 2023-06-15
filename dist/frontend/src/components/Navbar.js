"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Search_1 = __importDefault(require("./Search"));
//import MiniVariantDrawer from './components/MiniVariantDrawer'
const AppBar_1 = __importDefault(require("@mui/material/AppBar"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Drawer_1 = __importDefault(require("@mui/material/Drawer"));
const List_1 = __importDefault(require("@mui/material/List"));
const Badge_1 = __importDefault(require("@mui/material/Badge"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const Divider_1 = __importDefault(require("@mui/material/Divider"));
const Menu_1 = __importDefault(require("@mui/material/Menu"));
const Menu_2 = __importDefault(require("@mui/icons-material/Menu"));
const AccountCircle_1 = __importDefault(require("@mui/icons-material/AccountCircle"));
const Mail_1 = __importDefault(require("@mui/icons-material/Mail"));
const ListItem_1 = __importDefault(require("@mui/material/ListItem"));
const ListItemIcon_1 = __importDefault(require("@mui/material/ListItemIcon"));
const ListItemText_1 = __importDefault(require("@mui/material/ListItemText"));
const Notifications_1 = __importDefault(require("@mui/icons-material/Notifications"));
const MoreVert_1 = __importDefault(require("@mui/icons-material/MoreVert"));
const icons_material_1 = require("@mui/icons-material");
const icons_material_2 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const linkActive = {
    color: "inherit",
    fontWeight: "bold",
    textDecoration: "none",
};
const linkInactive = {
    color: "inherit",
    fontWeight: "normal",
    textDecoration: "none",
};
function Navbar() {
    // Menu derecho mobile ፧
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    // Abrir menu derecho mobile ፧
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    // Cerrar menú derecho mobile
    const handleMobileRightMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    // Menu profile
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isProfileMenuOpen = Boolean(anchorEl);
    // Abrir menú Profile
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // Cerrar menú Profile
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
        handleMobileRightMenuClose();
    };
    // Profile sub-options
    const profileMenuId = "primary-search-profile-menu";
    const profileMenu = (<Menu_1.default anchorEl={anchorEl} anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }} id={profileMenuId} keepMounted transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }} open={isProfileMenuOpen} onClose={handleProfileMenuClose} PaperProps={{
            elevation: 0,
            sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                },
            },
        }}>
      <MenuItem_1.default onClick={handleProfileMenuClose}>
        <react_router_dom_1.NavLink style={({ isActive }) => (isActive ? linkActive : linkInactive)} to="/profile">
          My profile
        </react_router_dom_1.NavLink>
      </MenuItem_1.default>
      <MenuItem_1.default onClick={handleProfileMenuClose}>
        <react_router_dom_1.NavLink style={({ isActive }) => (isActive ? linkActive : linkInactive)} to="/config">
          Configuration
        </react_router_dom_1.NavLink>
      </MenuItem_1.default>
      <Divider_1.default />
      <MenuItem_1.default onClick={handleProfileMenuClose}>
        <react_router_dom_1.NavLink style={({ isActive }) => (isActive ? linkActive : linkInactive)} to="/logout">
          Logout
        </react_router_dom_1.NavLink>
      </MenuItem_1.default>
    </Menu_1.default>);
    const cantMessages = 4, cantNotifications = 17;
    const rightMenuItems = [
        {
            text: "Messages",
            title: `Show ${cantMessages} new mails`,
            icon: <Mail_1.default />,
            link: "/messages",
            badge: {
                content: cantMessages,
            },
        },
        {
            text: "Notifications",
            title: `Show ${cantNotifications} new notifications`,
            icon: <Notifications_1.default />,
            link: "/notifications",
            badge: {
                content: cantNotifications,
            },
        },
    ];
    const RightMenuIcon = ({ item, showText }) => (<Tooltip_1.default title={item.title}>
      <react_router_dom_1.NavLink style={({ isActive }) => (isActive ? linkActive : linkInactive)} to={item.link}>
        <IconButton_1.default size="large" aria-label={item.title} color="inherit">
          <Badge_1.default badgeContent={item.badge.content} color={item.badge.color || "error"}>
            {item.icon}
          </Badge_1.default>
        </IconButton_1.default>
        {showText ? <p>{item.text}</p> : ""}
      </react_router_dom_1.NavLink>
    </Tooltip_1.default>);
    // Right options (mobile)
    const mobileProfileMenuId = "primary-search-profile-menu-mobile";
    const rightMenu = (<Menu_1.default anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: "top", horizontal: "right" }} id={mobileProfileMenuId} keepMounted transformOrigin={{ vertical: "top", horizontal: "right" }} open={isMobileMenuOpen} onClose={handleMobileRightMenuClose}>
      {rightMenuItems.map((item) => (<MenuItem_1.default key={item.link}>
          <RightMenuIcon item={item} showText={true}/>
        </MenuItem_1.default>))}
      <MenuItem_1.default onClick={handleProfileMenuOpen}>
        <IconButton_1.default size="large" color="inherit" aria-label="account of current user" aria-controls="primary-search-profile-menu" aria-haspopup="true">
          <AccountCircle_1.default />
        </IconButton_1.default>
        <p>Profile</p>
      </MenuItem_1.default>
    </Menu_1.default>);
    // Drawer state
    const [drawer, setDrawer] = React.useState({
        from: "left",
        opened: false,
    });
    // Event open/close drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawer(Object.assign(Object.assign({}, drawer), { opened: open }));
    };
    // Menu titles
    const menuList = [
        {
            text: "Rumbex",
            icon: <AccountCircle_1.default />,
            link: "/",
        },
        {},
        {
            text: "Administrador",
            icon: <icons_material_2.AdminPanelSettings />,
            submenus: [
                {
                    icon: <icons_material_2.Groups />,
                    link: "/person",
                    text: "Personas",
                },
                {
                    icon: <icons_material_1.Business />,
                    link: "/company",
                    text: "Empresas",
                },
            ],
        },
        {},
        {
            text: "Ingresos",
            icon: <icons_material_1.AttachMoney />,
            link: "/incomes",
        },
        {
            text: "Gastos",
            icon: <icons_material_2.AddCard />,
            link: "/expenses",
        },
        {},
        {
            text: "Cuentas",
            icon: <icons_material_1.AccountBalanceWallet />,
            link: "/accounts/list",
        },
        {
            text: "Productos",
            icon: <icons_material_1.Category />,
            link: "/products/list",
        },
        {
            text: "Activos",
            icon: <icons_material_1.Dashboard />,
            link: "/assets/list",
        },
        {
            text: "Indicadores",
            icon: <icons_material_2.Analytics />,
            link: "/indicators/list",
        },
    ];
    const MenuItemLink = ({ item, key }) => (<material_1.ListItemButton component={react_router_dom_1.NavLink} to={item.link || ""} key={key} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <ListItemIcon_1.default>{item.icon}</ListItemIcon_1.default>
      <ListItemText_1.default primary={item.text}/>
    </material_1.ListItemButton>);
    const MenuItemNested = ({ menu }) => {
        const [open, setOpen] = React.useState(false);
        const handleClick = () => {
            setOpen(!open);
        };
        return (<div>
        <ListItem_1.default button onClick={handleClick}>
          <ListItemIcon_1.default>{menu.icon}</ListItemIcon_1.default>
          <ListItemText_1.default primary={menu.text}/>
          {open ? <icons_material_1.ExpandLess /> : <icons_material_1.ExpandMore />}
        </ListItem_1.default>
        <material_1.Collapse in={open} timeout="auto" unmountOnExit>
          <List_1.default component="div" disablePadding>
            {menu.submenus.map((submenu, key) => (<material_1.ListItemButton sx={{ pl: 4 }} key={key} component={react_router_dom_1.NavLink} to={submenu.link} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                <ListItemIcon_1.default>{submenu.icon}</ListItemIcon_1.default>
                <ListItemText_1.default primary={submenu.text}/>
              </material_1.ListItemButton>))}
          </List_1.default>
        </material_1.Collapse>
      </div>);
    };
    const list = () => (<Box_1.default sx={{
            width: drawer.from === "top" || drawer.from === "bottom" ? "auto" : 250,
        }} role="presentation">
      <List_1.default>
        {menuList.map((item, index) => item.text ? (item.submenus ? (<MenuItemNested menu={item}/>) : (<MenuItemLink item={item} key={index}/>)) : (<Divider_1.default key={index}/>))}
      </List_1.default>
    </Box_1.default>);
    //   const list = () => (
    //     <Box
    //       sx={{ width: drawer.from === 'top' || drawer.from === 'bottom' ? 'auto' : 250 }}
    //       role="presentation"
    //       onClick={toggleDrawer(false)}
    //       onKeyDown={toggleDrawer(false)}
    //     >
    //       <List>
    //         {menuList.map((item, index) => item.text ? (
    // 			<NavLink to={item.link} key={index} style={({isActive}) => isActive ? linkActive : linkInactive}>
    // 				<ListItem button>
    // 					<ListItemIcon>{item.icon}</ListItemIcon>
    // 					<ListItemText primary={item.text} />
    // 				</ListItem>
    // 			</NavLink>
    //         ) : <Divider key={index}/>)}
    //       </List>
    //     </Box>
    //   );
    // Navbar
    return (<Box_1.default sx={{ flexGrow: 1 }}>
      <AppBar_1.default position="static">
        <Toolbar_1.default>
          {/* Icono abrir Menu */}
          <IconButton_1.default size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            <Menu_2.default />
          </IconButton_1.default>

          {/* Nombre de la página */}
          <Typography_1.default variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            <react_router_dom_1.NavLink style={linkInactive} to="/">
              RBX-Wallets
            </react_router_dom_1.NavLink>
          </Typography_1.default>

          {/* Buscador */}
          <Search_1.default text="Buscar..."/>

          {/* Relleno */}
          <Box_1.default sx={{ flexGrow: 1 }}/>

          {/* Botones de la derecha (>=md) */}
          <Box_1.default sx={{ display: { xs: "none", md: "flex" } }}>
            {rightMenuItems.map((item) => (<RightMenuIcon key={item.link} item={item} showText={false}/>))}
            <IconButton_1.default size="large" edge="end" color="inherit" aria-label="account of current user" aria-controls={profileMenuId} aria-haspopup="true" onClick={handleProfileMenuOpen}>
              <AccountCircle_1.default />
            </IconButton_1.default>
          </Box_1.default>

          {/* Botón de más opciones ፧ (<=s) */}
          <Box_1.default sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton_1.default size="large" aria-label="show more" aria-controls={mobileProfileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreVert_1.default />
            </IconButton_1.default>
          </Box_1.default>
        </Toolbar_1.default>
      </AppBar_1.default>
      {rightMenu}
      {profileMenu}
      <Drawer_1.default anchor={drawer === null || drawer === void 0 ? void 0 : drawer.from} open={drawer.opened} onClose={toggleDrawer(false)}>
        {list( /*drawer.from*/)}
      </Drawer_1.default>
      {/*<MiniVariantDrawer />*/}
    </Box_1.default>);
}
exports.default = Navbar;
