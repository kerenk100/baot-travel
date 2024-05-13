import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/Header/Header";
import styles from "./App.module.scss";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import { Footer } from "./components/layout/Footer/Footer";
import { AppContextProvider } from "./App.context";

export const App = () => {

  return (
    <AppContextProvider>
      <>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <Container className={styles.container}>{<Outlet />}</Container>
      </div>
      <Footer />
      </>
    </AppContextProvider>
  );
};
