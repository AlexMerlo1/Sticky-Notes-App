import axios from "axios";
import { useEffect, useState } from "react";
import Note from "./note";
import "../style/dashboard.css";
function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await axios.get("");
        setNotes(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="note-list">
      {notes.length ? (
        notes.map((item, i) => <Note note={item} key={i} />)
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
}

export default NoteList;
