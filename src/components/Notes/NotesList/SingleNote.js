import React from "react";
import styles from "./SingleNote.module.css";

function SingleNote(props) {
  const { id, noteColor, noteText, isStarred } = props.note;
  const date = new Date(props.note.date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  function dragStartHandler(e, note) {
    props.onDragANote(note);
  }

  function dragEndHandler(e) {
    e.target.closest("li").style.boxShadow = "0 0 0 #999";
  }

  function dragOverHandler(e) {
    e.preventDefault();
    e.target.closest("li").style.boxShadow = "0 0px 30px #777";
  }

  function dropHandler(e, note) {
    e.preventDefault();
    e.target.closest("li").style.boxShadow = "0 0 0 #999";
    props.onDropANote(note);
  }

  return (
    <li
      onDragStart={(e) => dragStartHandler(e, props.note)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, props.note)}
      draggable={true}
      id={id}
      style={{ backgroundColor: noteColor }}
      className={styles.note}
    >
      <p className={styles.text}>{noteText}</p>
      <button name="star" className={styles["starred-button"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${styles["starred-icon"]} ${
            isStarred ? styles["starred"] : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </button>
      <p className={styles.date}>{date}</p>
      <button name="edit" className={styles["edit-button"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles["edit-icon"]}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </button>
    </li>
  );
}

export default SingleNote;
