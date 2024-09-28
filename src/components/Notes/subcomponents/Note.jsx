import "./Note.css";
import { icons } from "@assets";
import PropTypes from "prop-types";

function Note(props) {
  return (
    <article className="note">
      <div className="note__timestamp">{props.created}</div>
      <h2 className="note__title">{props.title}</h2>
      <div className="note__body">{props.body}</div>
      <hr />
      <div className="note__actions">
        <button title="copy">
          <img
            className="note__auctions-icon"
            src={icons["default"].copy}
            alt="copy"
          />
        </button>

        <button title="edit">
          <img
            className="note__auctions-icon"
            src={icons["default"].edit}
            alt="edit"
          />
        </button>

        <button title="pin">
          <img
            className="note__auctions-icon"
            src={icons["default"].pin}
            alt="pin"
          />
        </button>

        <button title="delete">
          <img
            className="note__auctions-icon"
            src={icons["default"].remove}
            alt="remove"
          />
        </button>
      </div>
    </article>
  );
}

Note.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  created: PropTypes.string,
};

export default Note;
