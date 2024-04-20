import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/Header/Header";
import styles from "./App.module.scss";
import { AppBar } from "@mui/material";

export const App = () => {
  return (
    <>
      <Header />
      <Container className={styles.container}>{<Outlet />}</Container>
      <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
        All rights reseverd to Baot ®
      </AppBar>
    </>
  );
};
