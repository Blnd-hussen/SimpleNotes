import Header from "./components/Header/Header";
import Notes from "./components/Notes/Notes";
import AddForm from "./components/AddForm/AddForm";

import { useState, useEffect } from "react";
import browser from "webextension-polyfill";

import "./App.css";

function App() {
  const [hasAddForm, setHasAddForm] = useState(false);
  const [fromClosed, setFormClosed] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleAddClick = () => {
    setHasAddForm((prev) => !prev);
    setFormClosed(false);
  };

  const handleFormClose = () => {
    setHasAddForm(false);
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
      <Header onAddClick={handleAddClick} />
      {hasAddForm && !fromClosed && (
        <AddForm onClose={handleFormClose} onSave={fetchNotes} />
      )}
      <Notes notes={notes} />
    </main>
  );
}

export default App;
