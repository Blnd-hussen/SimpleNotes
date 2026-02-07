import "./Note.css";

import PropTypes from "prop-types";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { toast } from "react-toastify";

import { icons } from "@assets";
import { BiSolidLockAlt, BiSolidLockOpenAlt } from "react-icons/bi";

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

  const ICON_COLOR = props.pinStatus ? "#a26f40" : "#b9a648";

  return (
    <article
      className={`note ${props.pinStatus ? "pinned--note" : ""}`}
      style={{ position: "relative" }}
    >
      {props.lockStatus && (
        <div className="note__lock-indicator">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
            onClick={() => props.onLock(props.id)}
          >
            <BiSolidLockAlt style={{ minHeight: "18px", minWidth: "18px" }} />
            Unlock
          </button>
        </div>
      )}
      <div className="note__timestamp">{props.created}</div>
      <h2 className="note__title">{props.title}</h2>
      <div className="note__body">
        <Markdown
          className="note__markdown-container"
          remarkPlugins={[remarkGfm]}
        >
          {props.body}
        </Markdown>
      </div>
      <hr />
      <section className="note__actions-container">
        <button
          title={props.lockStatus ? "unlock" : "lock"}
          onClick={() => props.onLock(props.id)}
        >
          {props.lockStatus ? (
            <BiSolidLockAlt
              style={{ color: ICON_COLOR, minHeight: "19px", minWidth: "19px" }}
            />
          ) : (
            <BiSolidLockOpenAlt
              style={{ color: ICON_COLOR, minHeight: "19px", minWidth: "19px" }}
            />
          )}
        </button>

        <div className="note_actions">
          <button disabled={props.lockStatus} title="copy" onClick={handleCopy}>
            <img
              className="note__auctions-icon"
              src={
                props.pinStatus ? icons["pinned"].copy : icons["default"].copy
              }
              alt="copy"
            />
          </button>

          <button
            disabled={props.lockStatus}
            title="edit"
            onClick={() => props.onEdit(props.id)}
          >
            <img
              className="note__auctions-icon"
              src={
                props.pinStatus ? icons["pinned"].edit : icons["default"].edit
              }
              alt="edit"
            />
          </button>

          <button
            disabled={props.lockStatus}
            title={props.pinStatus ? "unpin" : "pin"}
            onClick={() => props.onPin(props.id)}
          >
            <img
              className="note__auctions-icon"
              src={
                props.pinStatus ? icons["pinned"].unpin : icons["default"].pin
              }
              alt={props.pinStatus ? "unpin" : "pin"}
            />
          </button>

          <button
            disabled={props.lockStatus}
            title="delete"
            onClick={() => props.onDelete(props.id)}
          >
            <img
              className="note__auctions-icon"
              src={
                props.pinStatus
                  ? icons["pinned"].remove
                  : icons["default"].remove
              }
              alt="remove"
            />
          </button>
        </div>
      </section>
    </article>
  );
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  created: PropTypes.string,
  pinStatus: PropTypes.bool,
  lockStatus: PropTypes.bool || false,
  onDelete: PropTypes.func,
  onPin: PropTypes.func,
  onEdit: PropTypes.func,
  onLock: PropTypes.func,
};

export default Note;
