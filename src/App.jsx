import Header from "./components/Header/Header";
import Notes from "./components/Notes/Notes";
import AddForm from "./components/AddForm/AddForm";
import "./App.css";

import { useState, useEffect } from "react";
import browser from "webextension-polyfill";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleSearch = (value) => {
    fetchNotes(value);
  };

  const fetchNotes = (searchTerm = "") => {
    browser.storage.local.get("notes").then((response) => {
      let storedNotes = response.notes ? response.notes : [];

      if (searchTerm && storedNotes.length) {
        storedNotes = storedNotes.filter((note) =>
          note.title.includes(searchTerm)
        );
      }
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

      <Header onAddClick={handleAddClick} onSearch={handleSearch} />

      {hasAddForm && !fromClosed && (
        <AddForm onClose={handleFormClose} onSave={fetchNotes} />
      )}

      <Notes notes={notes} onChange={fetchNotes} />
    </main>
  );
}

export default App;
