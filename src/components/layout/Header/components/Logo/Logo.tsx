import { IconButton } from "@mui/material";
import styles from "./Logo.module.scss";

export const Logo = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <IconButton className={styles.logo} onClick={onClick}>
      <img src="/images/logo.png" />
    </IconButton>
  );
};
