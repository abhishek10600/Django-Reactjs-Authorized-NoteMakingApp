import api from "../api";

import React, { useEffect, useState } from "react";
import Notes from "../components/Notes";
import "../styles/Home.css";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      setNotes(res.data);
      console.log(res.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}`);
      if (res.status === 204) {
        alert("Note was deleted");
      } else {
        alert("Failed to delte the note");
      }
    } catch (error) {
      alert(error);
    } finally {
      getNotes();
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/notes/", {
        content,
        title,
      });
      if (res.status === 201) {
        alert("Note created sucessfully!");
      } else {
        alert("Failed to create your note");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getNotes();
    }
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Notes key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          required
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Home;
