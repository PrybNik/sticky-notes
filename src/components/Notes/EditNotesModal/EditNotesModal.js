import React, { useRef } from "react";
import styles from "./EditNotesModal.module.css";

function EditNotesModal(props) {
  const inputNote = useRef();
  const inputColor = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const note = { ...props.note };
    note.noteText = inputNote.current.value;
    note.noteColor = `${inputColor.current.value}75`;
    note.date = Number(new Date());

    console.log(note);
    props.onFinishEditing(note);
  }

  const deleteHandler = () => props.onDelete(props.note.id);

  return (
    <React.Fragment>
      <div className={styles.modal}>
        <button onClick={submitHandler} className={styles["button-close"]}>
          &times;
        </button>
        <h2 className={styles["modal-header"]}>Edit</h2>
        <form onSubmit={submitHandler} className={styles["change-form"]}>
          <label htmlFor="change-text">Change your note</label>
          <input
            ref={inputNote}
            defaultValue={props.note.noteText}
            className={styles["change-text"]}
            id="change-text"
            type="text"
          />
          <label htmlFor="change-color">Change note's color</label>
          <input
            ref={inputColor}
            defaultValue={props.note.noteColor.slice(0, -2)}
            className={styles["change-color"]}
            id="change-color"
            type="color"
          />
          <button className={styles["button-submit"]}>Done!</button>
        </form>
        <button onClick={deleteHandler} className={styles["button-delete"]}>
          Delete
        </button>
      </div>
      <div onClick={submitHandler} className={styles.overlay}></div>
    </React.Fragment>
  );
}

export default EditNotesModal;
