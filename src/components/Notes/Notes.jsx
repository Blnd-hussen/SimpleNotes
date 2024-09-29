import Note from "./subcomponents/Note";
import "./Notes.css";

import PropTypes from "prop-types";

function Notes(props) {
  return (
    <div className="notes">
      {props.notes.map((note, index) => (
        <Note
          key={index}
          title={note.title}
          created={note.created}
          body={note.body}
        />
      ))}
    </div>
  );
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      created: PropTypes.string,
      body: PropTypes.string,
      pinStatus: PropTypes.bool,
    })
  ),
};

export default Notes;
