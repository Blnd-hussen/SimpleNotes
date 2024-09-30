import Note from "./subcomponents/Note";
import "./Notes.css";

import PropTypes from "prop-types";
import browser from "webextension-polyfill";

function Notes(props) {
  const handleDelete = async (noteId) => {
    try {
      const response = await browser.storage.local.get("notes");
      if (!response.notes) {
        throw new Error("No notes were found");
      }

      const updateNotes = response.notes.filter((note) => note.id !== noteId);
      await browser.storage.local.set({ notes: updateNotes });

      props.onChange();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="notes">
      {props.notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          created={note.created}
          body={note.body}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      created: PropTypes.string,
      body: PropTypes.string,
      pinStatus: PropTypes.bool,
    })
  ),
  onChange: PropTypes.func,
};

export default Notes;
