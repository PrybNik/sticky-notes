import React, { useEffect, useState } from "react";
import SingleNote from "./SingleNote";
import styles from "./NotesList.module.css";

function NotesList(props) {
  //Handling note clicks in one place to prevent creating too many listeners on each note on each button
  function clickHandler(e) {
    const note = e.target.closest("li");
    //If user did not click on a note.
    if (note === null) return;
    //If user clicked on a note
    const id = note.id;
    //If user clicked on a star
    if (e.target.closest("button")?.name === "star") props.onStar(id);
    //If user clicked on edit
    if (e.target.closest("button")?.name === "edit") props.onStartEditing(id);
  }

  //Getting data about taken and current notes and push their order props to app comp. for rearrange purposes.
  //Replacing is needed only on drops so useEffect affects only on drops
  const [takenNote, setTakenNote] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const dragNoteHandler = (taken) => setTakenNote(taken);
  const dropNoteHandler = (current) => setCurrentNote(current);

  useEffect(() => {
    if (takenNote && currentNote)
      props.onChangeOrder({
        taken: takenNote.order,
        current: currentNote.order,
      });
  }, [currentNote]);

  return (
    <ul onClick={clickHandler} className={styles.list}>
      {props.notes.map((note) => (
        <SingleNote
          onDragANote={dragNoteHandler}
          onDropANote={dropNoteHandler}
          key={note.id}
          note={note}
        />
      ))}
    </ul>
  );
}

export default NotesList;
