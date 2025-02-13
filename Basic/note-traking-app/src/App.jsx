// import { useState } from "react";
// import "./App.css";

// const App = () => {
//   const [noteTitle, setNoteTitle] = useState("");
//   const [notes, setNotes] = useState([
//     { id: 1, title: "Note 1" },
//     { id: 2, title: "Note 2" },
//     { id: 3, title: "Note 3" },
//   ]);
//   const [editMode, setEditMode] = useState(false);
//   const [editableNote, setEditableNote] = useState(null);

//   const changeTitleHandler = (e) => {
//     setNoteTitle(e.target.value);
//     console.log(noteTitle);
//   };
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (noteTitle.trim() === "") {
//       return alert("Please enter a note title");
//     }
//     setNotes([...notes, { id: Math.random(), title: noteTitle }]);
//     setNoteTitle("");
//   };
//   const removeHandelar = (id) => {
//     setNotes(notes.filter((note) => note.id !== id));
//   };
//   const editHandelar = (note) => {
//     setEditMode(true);
//     setEditableNote(note);
//     setNoteTitle(note.title);
//   };
//   const updateHandelar = (e) => {
//     e.preventDefault();
//     setNotes(
//       notes.map((note) =>
//         note.id === editableNote.id ? { ...note, title: noteTitle } : note
//       )
//     );
//     setEditMode(false);
//     setEditableNote(null);
//     setNoteTitle("");
//   };
//   return (
//     <div>
//       <form onSubmit={submitHandler}>
//         <input type="text" value={noteTitle} onChange={changeTitleHandler} />
//         <button>{editMode ? "Update Note" : "Add Note"}</button>
//       </form>
//       <div className="">
//         <h1>All Notes</h1>
//         <ul>
//           {notes.map((note, index) => (
//             <li key={index}>
//               <span>{note.title}</span>
//               <button onClick={() => editHandelar(note)}>Edit</button>
//               <button onClick={() => removeHandelar(note.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default App;

import { useState } from "react";
import "./App.css";

const App = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, title: "Note 1" },
    { id: 2, title: "Note 2" },
    { id: 3, title: "Note 3" },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [editableNote, setEditableNote] = useState(null);

  const changeTitleHandler = (e) => {
    setNoteTitle(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (noteTitle.trim() === "") {
      return alert("Please enter a note title");
    }

    if (editMode) {
      updateHandler();
    } else {
      createHandler();
    }
  };

  const createHandler = () => {
    setNotes([...notes, { id: Math.random(), title: noteTitle }]);
    resetForm();
  };

  const removeHandler = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editHandler = (note) => {
    setEditMode(true);
    setEditableNote(note);
    setNoteTitle(note.title);
  };

  const updateHandler = () => {
    setNotes(
      notes.map((note) =>
        note.id === editableNote.id ? { ...note, title: noteTitle } : note
      )
    );
    resetForm();
  };

  const resetForm = () => {
    setEditMode(false);
    setEditableNote(null);
    setNoteTitle("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" value={noteTitle} onChange={changeTitleHandler} />
        <button>{editMode ? "Update Note" : "Add Note"}</button>
      </form>
      <div>
        <h1>All Notes</h1>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <span>{note.title}</span>
              <button onClick={() => editHandler(note)}>Edit</button>
              <button onClick={() => removeHandler(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
