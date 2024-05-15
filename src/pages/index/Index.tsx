import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/routes";
import { Card, Container } from "@mui/material";
import styles from "./index.module.scss";

export const Index = () => {
  const pages = ["trips", "vendors"];
  const navigate = useNavigate();
  return (
    <div className={styles.layout}>
      <div>
        <p>Welcome to BaotTravel!</p>
        <p>
          Here you find trips done by other people, get inspired, and plan your own trip!
        </p>
        <p>Enjoy!</p>
      </div>

      <div className={styles.pagesCards}>
        {pages.map((pageName) => {
          const key: string = pageName.toUpperCase();
          return (
            <Card
              className={styles.pageCard}
              onClick={() => navigate(Routes[key as keyof typeof Routes])}
            >
              {pageName}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
