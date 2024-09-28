import { useState } from 'react'

import Header from './components/Header/Header'
import Notes from './components/Notes/Notes'
import AddForm from './components/AddForm/AddForm'

import './App.css'

function App() {
  const [hasAddForm, setHasAddForm] = useState(false);

  const handleAddClick = () => {
    setHasAddForm(hasAddForm => !hasAddForm);
  }

  return (
    <main>
      <Header onAddClick={handleAddClick}/>
      { hasAddForm && <AddForm /> }
      <Notes />
    </main>
  )
}

export default App
