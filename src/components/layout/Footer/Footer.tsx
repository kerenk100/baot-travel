import { AppBar } from "@mui/material"
import styles from './Footer.module.scss'

export const Footer =()=>{
    return <AppBar className={styles.footer} position="fixed" sx={{ top: "auto", bottom: 0 }}>
    All rights reseverd to Baot ®
  </AppBar>
}