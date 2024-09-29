import { useState } from "react";

import Header from "./components/Header/Header";
import Notes from "./components/Notes/Notes";
import AddForm from "./components/AddForm/AddForm";

import "./App.css";

function App() {
  const [hasAddForm, setHasAddForm] = useState(false);
  const [fromClosed, setFormClosed] = useState(false);

  const handleAddClick = () => {
    setHasAddForm((prev) => !prev);
    setFormClosed(false);
  };

  const handleFormClose = () => {
    setHasAddForm(false);
    setFormClosed(true);
  };

  return (
    <main>
      <Header onAddClick={handleAddClick} />
      {hasAddForm && !fromClosed && <AddForm onClose={handleFormClose} />}
      <Notes />
    </main>
  );
}

export default App;
