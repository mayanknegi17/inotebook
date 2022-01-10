import React from "react";

// Css
import styles from "./Css/MainContainer.module.css";

const MainContainer = ({ children }) => {
  return <div className={styles["main"]}>{children}</div>;
};

export default MainContainer;
