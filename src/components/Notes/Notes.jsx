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

  const handlePin = async (noteId) => {
    try {
      const response = await browser.storage.local.get("notes");
      if (!response.notes) {
        throw new Error("No notes were found");
      }

      const notes = response.notes;
      const targetNote = notes.find((note) => note.id === noteId);
      if (targetNote) {
        targetNote.pinStatus = !targetNote.pinStatus;
      }

      await browser.storage.local.set({ notes: notes });
      props.onChange();
    } catch (err) {
      console.error(err);
    }
  };

  const pinList = [];
  const noteList = [];

  props.notes.forEach((note) => {
    let currentNote = (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        created={note.created}
        body={note.body}
        onDelete={handleDelete}
        onPin={handlePin}
      />
    );

    if (note.pinStatus) pinList.push(currentNote);
    else noteList.push(currentNote);
  });

  return (
    <>
      {pinList.length > 0 && <div className="pined-notes">{pinList}</div>}
      <div className="notes">{noteList}</div>
    </>
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
