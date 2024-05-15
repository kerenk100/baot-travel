import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Routes } from "../../../routes/routes";
import { Logo } from "./components/Logo/Logo";
import styles from './Header.module.scss'

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("log out");
  };
  let userId:string;
  //const {user} = useAppContext(); // wait till 'load'?
  // const userId = user.userId;

  const USER_MENU = [
    {
      name: "Settings",
      onClick: () => navigate(Routes.SETTINGS),
    },
    {
      name: "Log out",
      onClick: handleLogout,
    },
    {
      name: "Edit user",
      onClick: () => navigate(`/users/register/${userId || '66389a4d500395bf2c8d0563'}` , {
        state: {
          userId: '66389a4d500395bf2c8d0563',
        }
      }),
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
          <Logo onClick={()=>navigate(Routes.HOME)}/>
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
