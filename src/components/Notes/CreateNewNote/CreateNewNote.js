import React, { useRef, useState } from "react";
import styles from "./CreateNewNote.module.css";

function CreateNewNote(props) {
  const inputNote = useRef();
  const inputColor = useRef();
  const [formIsOpen, setFormIsOpen] = useState(false);

  const openForm = () => setFormIsOpen(true);

  function submitHandler(e) {
    e.preventDefault();
    setFormIsOpen(false);

    const newNote = {
      id: Math.random().toFixed(5),
      date: Number(new Date()),
      noteText: inputNote.current.value,
      noteColor: `${inputColor.current.value}75`, //adding about 50% transparency to hex color
      isStarred: false,
    };

    inputNote.current.value = "";
    inputColor.current.value = "#000";
    props.onNewNote(newNote);
  }

  return (
    <React.Fragment>
      <form
        onSubmit={submitHandler}
        className={`${styles.form} ${formIsOpen ? styles.unhidden : ""}`}
      >
        <div className={styles["form_input-area"]}>
          <label htmlFor={"input-note"}>What's on your mind?</label>
          <input
            ref={inputNote}
            type={"text"}
            id={"input-note"}
            className={styles["form_input-note"]}
          />
          <label htmlFor={"input-color"}>Pick a color:</label>
          <input
            ref={inputColor}
            type={"color"}
            id={"input-color"}
            className={styles["form_input-color"]}
          />
        </div>
        <button className={styles.button}>✍ Create a new note</button>
      </form>
      <button
        onClick={openForm}
        className={`${styles.button} ${formIsOpen ? styles.hidden : ""}`}
      >
        ✍ Create a new note
      </button>
    </React.Fragment>
  );
}

export default CreateNewNote;
