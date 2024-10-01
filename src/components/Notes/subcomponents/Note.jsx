import "./Note.css";

import { icons } from "@assets";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function Note(props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(props.body);
    toast.success("Text copied to clipboard.", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <article className={`note ${props.pinStatus ? "pined-note" : ""}`}>
      <div className="note__timestamp">{props.created}</div>
      <h2 className="note__title">{props.title}</h2>
      <div className="note__body">{props.body}</div>
      <hr />
      <div className="note__actions">
        <button title="copy" onClick={handleCopy}>
          <img
            className="note__auctions-icon"
            src={
              props.pinStatus
                ? icons["default"].pinned.copy
                : icons["default"].copy
            }
            alt="copy"
          />
        </button>
        <button title="edit" onClick={() => props.onEdit(props.id)}>
          <img
            className="note__auctions-icon"
            src={
              props.pinStatus
                ? icons["default"].pinned.edit
                : icons["default"].edit
            }
            alt="edit"
          />
        </button>
        <button
          title={props.pinStatus ? "unpin" : "pin"}
          onClick={() => props.onPin(props.id)}
        >
          <img
            className="note__auctions-icon"
            src={
              props.pinStatus
                ? icons["default"].pinned.unpin
                : icons["default"].pin
            }
            alt={props.pinStatus ? "unpin" : "pin"}
          />
        </button>
        <button title="delete" onClick={() => props.onDelete(props.id)}>
          <img
            className="note__auctions-icon"
            src={
              props.pinStatus
                ? icons["default"].pinned.remove
                : icons["default"].remove
            }
            alt="remove"
          />
        </button>
      </div>
    </article>
  );
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  created: PropTypes.string,
  pinStatus: PropTypes.bool,
  onDelete: PropTypes.func,
  onPin: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Note;
