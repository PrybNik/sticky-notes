import React, { useEffect, useReducer, useState } from "react";
import CreateNewNote from "./CreateNewNote/CreateNewNote";
import FilterNotes from "./FilterNotes/FilterNotes";
import NotesList from "./NotesList/NotesList";
import styles from "./Notes.module.css";
import EditNotesModal from "./EditNotesModal/EditNotesModal";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        notes: [...state.notes, action.payload],
        filterType: state.filterType,
      };

    case "FILTER":
      return { notes: state.notes, filterType: action.payload };

    case "TOGGLE_A_STAR":
      const toggledNotes = state.notes.map((note) => {
        const newNote = { ...note };
        if (newNote.id === action.payload)
          newNote.isStarred = newNote.isStarred ? false : true;
        return newNote;
      });
      return { notes: [...toggledNotes], filterType: state.filterType };

    case "CHANGE_A_NOTE":
      const changedNotes = state.notes.map((note) => {
        let newNote = { ...note };
        if (newNote.id === action.payload.id) newNote = { ...action.payload };
        return newNote;
      });
      return { notes: [...changedNotes], filterType: state.filterType };

    case "DELETE_A_NOTE":
      const savedNotes = [];
      state.notes.forEach((note) => {
        if (note.id !== action.payload) savedNotes.push(note);
      });
      return { notes: [...savedNotes], filterType: state.filterType };

    case "REARRANGE_NOTES":
      const { taken, current } = action.payload;
      const newOrder = state.notes.map((note) => {
        if (note.order === taken) return { ...note, order: current };
        if (note.order === current) return { ...note, order: taken };
        return { ...note };
      });
      newOrder.sort((a, b) => a.order - b.order);
      return { notes: [...newOrder], filterType: state.filterType };

    default:
      return { notes: [...state.notes], filterType: state.filterType };
  }
};

function Notes() {
  //Defining initial states
  const [state, dispatch] = useReducer(reducer, {
    notes: [
      {
        date: 1667475879588,
        id: "0.26560",
        isStarred: false,
        noteColor: "#da4e4e75",
        noteText: "Test sticky note app by Artem Babak",
        order: 2,
      },
    ],
    filteredNotes: [
      {
        date: 1667475879588,
        id: "0.26560",
        isStarred: false,
        noteColor: "#da4e4e75",
        noteText: "Test sticky note app by Artem Babak",
        order: 2,
      },
    ],
    filterType: "all",
  });
  /////////////////////////////////////////////

  //Adding new note (adding prop "order" for "drag and drop" purposes)
  const createNoteHandler = (note) => {
    if (state.notes.length > 0) {
      const lastCurrentNote = state.notes.at(-1);
      note.order = lastCurrentNote.order + 1;
    } else note.order = 1;
    dispatch({ type: "ADD_NOTE", payload: note });
  };
  /////////////////////////////////////////////

  //Implementing notes sort
  const [filteredNotes, setFilteredNotes] = useState([...state.notes]);
  useEffect(() => {
    switch (state.filterType) {
      case "all":
        setFilteredNotes([...state.notes]);
        break;
      case "starred":
        setFilteredNotes(state.notes.filter((note) => note.isStarred === true));
        break;
    }
  }, [state.notes, state.filterType]);

  const filterHandler = (filterType) =>
    dispatch({ type: "FILTER", payload: filterType });
  /////////////////////////////////////////////

  //Implementing note's changes
  const [noteOnChange, setNoteOnChange] = useState([]);

  const openEditor = (id) => {
    const note = filteredNotes.find((note) => note.id === id);
    setNoteOnChange([{ ...note }]);
  };

  const closeEditor = (note) => {
    setNoteOnChange([]);
    dispatch({ type: "CHANGE_A_NOTE", payload: note });
  };

  const deleteNote = (id) => {
    setNoteOnChange([]);
    dispatch({ type: "DELETE_A_NOTE", payload: id });
  };
  /////////////////////////////////////////////

  //Toggle a star on a note
  const toggleStarOnNote = (id) =>
    dispatch({ type: "TOGGLE_A_STAR", payload: id });
  /////////////////////////////////////////////

  //Implementing rearranging notes
  const changeOrderHandler = (orders) =>
    dispatch({ type: "REARRANGE_NOTES", payload: orders });
  /////////////////////////////////////////////

  return (
    <React.Fragment>
      <main
        className={`${styles.main} ${
          noteOnChange.length ? styles["scroll-block"] : ""
        }`}
      >
        <CreateNewNote onNewNote={createNoteHandler} />
        <FilterNotes onFilter={filterHandler} />
        <NotesList
          onChangeOrder={changeOrderHandler}
          onStartEditing={openEditor}
          onStar={toggleStarOnNote}
          notes={filteredNotes}
        />
      </main>
      {noteOnChange.length ? (
        <EditNotesModal
          onDelete={deleteNote}
          onFinishEditing={closeEditor}
          note={noteOnChange[0]}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
export default Notes;
