import Note from "./subcomponents/Note"
import "./Notes.css"

function Notes() {
  return (
    <div className="notes">
      <Note 
        title="Hello"
        created="19/09/2024 - 05:29 PM"
        body="this is a test note"
      />
    </div>
  )
}

export default Notes
