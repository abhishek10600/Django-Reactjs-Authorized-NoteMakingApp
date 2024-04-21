import React from "react";
import "../styles/Note.css";

const Notes = ({ note, onDelete }) => {
  const formattedData = new Date(note.created_at).toLocaleDateString("en-IN");
  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-data">{formattedData}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
};

export default Notes;
