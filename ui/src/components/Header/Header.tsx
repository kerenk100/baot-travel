import React from "react";
import AccountMenu from "../AccountMenu/AccountMenu";
import styles from './Header.module.scss'
import Icon from "../Icon/Icon";

interface HeaderProps {
  height?: number;
}
export const Header: React.FC<HeaderProps> = ({height}) => {
  return (
    <div className={styles.header} style={{height:`${height}px`}}>
      <div>
        <Icon name="logo"/>
      </div>
    <AccountMenu />
    </div>
  );
};
