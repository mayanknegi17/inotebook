import React from "react";
import MainContainer from "../../Component/MainContainer/MainContainer";

// Custom
import LoginSection from "./Components/LoginSection";

// Css
import styles from "./Css/Login.module.css";

function LoginPage() {
  return (
    <MainContainer>
      <div className={styles["container"]}>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          alt="Phone image"
          className={styles["image"]}
        />
        <div className={`${styles["flex1"]}`}>
          <LoginSection />
        </div>
      </div>
    </MainContainer>
  );
}

export default LoginPage;
