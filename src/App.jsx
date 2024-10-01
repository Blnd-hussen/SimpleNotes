import Header from "./components/Header/Header";
import Notes from "./components/Notes/Notes";
import NoteForm from "./components/NoteForm/NoteForm";
import "./App.css";

import { useState, useEffect } from "react";
import browser from "webextension-polyfill";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [hasNoteForm, setHasNoteForm] = useState(false);
  const [fromClosed, setFormClosed] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleAddClick = () => {
    setHasNoteForm((prev) => !prev);
    setFormClosed(false);
  };

  const handleFormClose = () => {
    setHasNoteForm(false);
    setFormClosed(true);
  };

  const fetchNotes = () => {
    browser.storage.local.get("notes").then((response) => {
      const storedNotes = response.notes ? response.notes : [];
      setNotes(storedNotes);
    });
  };

  useEffect(() => {
    fetchNotes();
  }, [setNotes]);

  return (
    <main>
      <ToastContainer
        className="custom-toast-container"
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Header onAddClick={handleAddClick} />
      {hasNoteForm && !fromClosed && (
        <NoteForm onClose={handleFormClose} onSave={fetchNotes} />
      )}

      <Notes notes={notes} onChange={fetchNotes} />
    </main>
  );
}

export default App;
