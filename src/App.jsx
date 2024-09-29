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
      {hasAddForm && !fromClosed && (
        <AddForm onClose={handleFormClose} onSave={fetchNotes} />
      )}
      <Notes notes={notes} />
    </main>
  );
}

export default App;
