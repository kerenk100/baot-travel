import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Favorite from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Routes } from "../../../routes/routes";
import { Logo } from "./components/Logo/Logo";
import styles from './Header.module.scss'
import { useAppContext } from "../../../App.context";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const {isLoggedIn, logout, user} = useAppContext();

  const USER_MENU = [
    {
      name: "Settings",
      onClick: () => navigate(Routes.SETTINGS),
    },
    {
      name: "Log out",
      onClick: () => {
        logout();
        navigate("/");
        setIsMenuOpen(false);
      },
    },
    {
      name: "Edit user",
      onClick: () => navigate(Routes.USERS_EDIT , {}),
    }
  ];

  const handleOpenUserMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseUserMenu = () => {
    setIsMenuOpen(false);
  };

  const DropdownMenu = (
    <Menu
      id="menu-appbar"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleCloseUserMenu}
    >
      {USER_MENU.map((setting) => (
        <MenuItem key={setting.name} onClick={setting.onClick}>
          <Typography textAlign="center">{setting.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <AppBar position={'fixed'} className={styles.header}>
      <Toolbar
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Logo onClick={() => navigate(Routes.HOME)} />
        </div>
        {isLoggedIn ? 
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>{user?.email.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
       : <Link to="/login">LOGIN</Link> }
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Wish List">
            <IconButton
              onClick={() => navigate(Routes.WISHLIST)}
              sx={{ p: 0, color: "red", marginRight: "16px" }}
              disableRipple
              disableFocusRipple
            >
              <Favorite />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} disableRipple disableFocusRipple>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
        </div>
        {DropdownMenu}
      </Toolbar>
    </AppBar>
  );
};
