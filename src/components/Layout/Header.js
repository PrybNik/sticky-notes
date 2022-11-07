import React from "react";
import styles from "./Header.module.css";

function Header(props) {
  return (
    <header className={styles.header}>
      <h1>📝 Test sticky note app by Artem Babak</h1>
    </header>
  );
}

export default Header;
