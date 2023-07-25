import axios from "axios";
import { useEffect, useState } from "react";
import Note from "./note";
import "../style/dashboard.css";

const text =
  "The sun was setting over the horizon, casting a warm orange glow over the landscape. The trees swayed gently in the breeze, their leaves rustling softly. A flock of birds flew overhead, their wings flapping in unison. In the distance, a dog barked, breaking the peaceful silence";

function NoteList() {
  const [notes, setNotes] = useState([
    { id: 1, text, type: "todo" },
    { id: 2, text, type: "todo" },
    { id: 3, text, type: "todo" },
    { id: 4, text, type: "inProgress" },
    { id: 5, text, type: "inProgress" },
    { id: 6, text, type: "done" },
    { id: 7, text, type: "done" },
  ]);

  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     try {
  //       const data = await axios.get("");
  //       setNotes(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchNotes();
  // }, []);

  function onDelete(id) {
    setNotes(notes.filter((note) => note.id !== id && note));
  }

  function onEdit(id, text) {
    setNotes(notes.map((note) => (note.id === id ? { ...note, text } : note)));
  }

  return (
    <div className="note-list">
      {notes.length ? (
        notes.map((item) => (
          <Note
            note={item}
            key={item.id}
            bg={item.type}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
}

export default NoteList;
