import React from "react";
import styles from "./FilterNotes.module.css";

function FilterNotes(props) {
  const selectHandler = (e) => props.onFilter(e.target.value);

  return (
    <select className={styles.select} onChange={selectHandler}>
      <option value="all">View All</option>
      <option value="starred">Only starred</option>
    </select>
  );
}

export default FilterNotes;
