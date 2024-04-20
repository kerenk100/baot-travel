import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Routes } from "../../../routes/routes";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("log out");
  };

  const USER_MENU = [
    {
      name: "Settings",
      onClick: () => navigate(Routes.SETTINGS),
    },
    {
      name: "Log out",
      onClick: handleLogout,
    },
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
    <AppBar position={'fixed'}>
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
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={Routes.HOME}
            sx={{
              fontFamily: "fantasy",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BaoTravel
          </Typography>
        </div>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        {DropdownMenu}
      </Toolbar>
    </AppBar>
  );
};
