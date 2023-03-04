import * as React from "react";
import { NavLink } from "react-router-dom";

import Search from "./Search";
//import MiniVariantDrawer from './components/MiniVariantDrawer'

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  AccountBalanceWallet,
  AttachMoney,
  Business,
  Category,
  Dashboard,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import {
  AddCard,
  AdminPanelSettings,
  Analytics,
  Groups,
} from "@mui/icons-material";
import { Collapse, ListItemButton } from "@mui/material";

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

export default function Navbar() {
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
  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
      PaperProps={{
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
      }}
    >
      <MenuItem onClick={handleProfileMenuClose}>
        <NavLink
          style={({ isActive }) => (isActive ? linkActive : linkInactive)}
          to="/profile"
        >
          My profile
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuClose}>
        <NavLink
          style={({ isActive }) => (isActive ? linkActive : linkInactive)}
          to="/config"
        >
          Configuration
        </NavLink>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleProfileMenuClose}>
        <NavLink
          style={({ isActive }) => (isActive ? linkActive : linkInactive)}
          to="/logout"
        >
          Logout
        </NavLink>
      </MenuItem>
    </Menu>
  );

  const cantMessages = 4,
    cantNotifications = 17;

  const rightMenuItems = [
    {
      text: "Messages",
      title: `Show ${cantMessages} new mails`,
      icon: <MailIcon />,
      link: "/messages",
      badge: {
        content: cantMessages,
      },
    },
    {
      text: "Notifications",
      title: `Show ${cantNotifications} new notifications`,
      icon: <NotificationsIcon />,
      link: "/notifications",
      badge: {
        content: cantNotifications,
      },
    },
  ];
  const RightMenuIcon = ({ item, showText }) => (
    <Tooltip title={item.title}>
      <NavLink
        style={({ isActive }) => (isActive ? linkActive : linkInactive)}
        to={item.link}
      >
        <IconButton size="large" aria-label={item.title} color="inherit">
          <Badge
            badgeContent={item.badge.content}
            color={item.badge.color || "error"}
          >
            {item.icon}
          </Badge>
        </IconButton>
        {showText ? <p>{item.text}</p> : ""}
      </NavLink>
    </Tooltip>
  );

  // Right options (mobile)
  const mobileProfileMenuId = "primary-search-profile-menu-mobile";
  const rightMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileProfileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileRightMenuClose}
    >
      {rightMenuItems.map((item) => (
        <MenuItem key={item.link}>
          <RightMenuIcon item={item} showText={true} />
        </MenuItem>
      ))}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          color="inherit"
          aria-label="account of current user"
          aria-controls="primary-search-profile-menu"
          aria-haspopup="true"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // Drawer state
  const [drawer, setDrawer] = React.useState({
    from: "left",
    opened: false,
  });

  // Event open/close drawer
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer({ ...drawer, opened: open });
  };

  // Menu titles
  const menuList = [
    {
      text: "Rumbex",
      icon: <AccountCircle />,
      link: "/",
    },
    {},
    {
      text: "Administrador",
      icon: <AdminPanelSettings />,
      submenus: [
        {
          icon: <Groups />,
          link: "/person",
          text: "Personas",
        },
        {
          icon: <Business />,
          link: "/company",
          text: "Empresas",
        },
      ],
    },
    {},
    {
      text: "Ingresos",
      icon: <AttachMoney />,
      link: "/incomes",
    },
    {
      text: "Gastos",
      icon: <AddCard />,
      link: "/expenses",
    },
    {},
    {
      text: "Cuentas",
      icon: <AccountBalanceWallet />,
      link: "/accounts/list",
    },
    {
      text: "Productos",
      icon: <Category />,
      link: "/products/list",
    },
    {
      text: "Activos",
      icon: <Dashboard />,
      link: "/assets/list",
    },
    {
      text: "Indicadores",
      icon: <Analytics />,
      link: "/indicators/list",
    },
  ];

  const MenuItemLink = ({ item, key }) => (
    <ListItemButton
      component={NavLink}
      to={item.link || ""}
      key={key}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      //style={({ isActive }) => (isActive ? linkActive : linkInactive)}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItemButton>
  );
  const MenuItemNested = ({ menu }) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    return (
      <div>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>{menu.icon}</ListItemIcon>
          <ListItemText primary={menu.text} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menu.submenus.map((submenu, key) => (
              <ListItemButton
                sx={{ pl: 4 }}
                key={key}
                component={NavLink}
                to={submenu.link}
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <ListItemIcon>{submenu.icon}</ListItemIcon>
                <ListItemText primary={submenu.text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </div>
    );
  };

  const list = () => (
    <Box
      sx={{
        width: drawer.from === "top" || drawer.from === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      //   onClick={toggleDrawer(false)}
      //   onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuList.map((item, index) =>
          item.text ? (
            item.submenus ? (
              <MenuItemNested menu={item} />
            ) : (
              <MenuItemLink item={item} key={index} />
            )
          ) : (
            <Divider key={index} />
          )
        )}
      </List>
    </Box>
  );
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Icono abrir Menu */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Nombre de la página */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <NavLink style={linkInactive} to="/">
              RBX-Wallets
            </NavLink>
          </Typography>

          {/* Buscador */}
          <Search text="Buscar..." />

          {/* Relleno */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Botones de la derecha (>=md) */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {rightMenuItems.map((item) => (
              <RightMenuIcon key={item.link} item={item} showText={false} />
            ))}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="account of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {/* Botón de más opciones ፧ (<=s) */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileProfileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {rightMenu}
      {profileMenu}
      <Drawer
        anchor={drawer?.from as DrawerProps["anchor"]}
        open={drawer.opened}
        onClose={toggleDrawer(false)}
      >
        {list(/*drawer.from*/)}
      </Drawer>
      {/*<MiniVariantDrawer />*/}
    </Box>
  );
}
