import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import browser from "webextension-polyfill";
import { v4 as uuidv4 } from "uuid";

import "./NoteForm.css";

function AddForm(props) {
  const getDate = () => {
    const date = new Date()
      .toJSON()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("-");

    const [hour, AMPM] = new Date()
      .toLocaleString("en-US", {
        hour: "2-digit",
        hour12: true,
      })
      .split(" ");

    const minute = new Date().toLocaleString("en-US", {
      minute: "2-digit",
      hour12: true,
    });

    return `${date} - ${hour}:${minute} ${AMPM}`;
  };

  const [formData, setFormData] = useState({
    id: props.id ? props.id : uuidv4(),
    title: props.title ? props.title : "",
    body: props.body ? props.body : "",
    pinStatus: props.pinStatus ? props.pinStatus : false,
    created: getDate(),
  });
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventSubmitter = event.nativeEvent.submitter;
    if (!eventSubmitter) return;

    const eventName = eventSubmitter.name;
    if (eventName === "save") {
      try {
        const response = await browser.storage.local.get("notes");
        const existingNotes = response.notes ? response.notes : [];
        const updatedNotes = [formData, ...existingNotes];

        await browser.storage.local.set({ notes: updatedNotes });

        props.onSave();
      } catch (err) {
        console.error(err);
      }
    }
    props.onClose();
  };

  useEffect(() => {
    setDisabled(formData.title.trim() === "");
  }, [formData]);

  return (
    <div className="form-container">
      <form className="form-note" onSubmit={handleSubmit}>
        <div className="form-note__timestamp">{getDate()}</div>
        <input
          type="text"
          placeholder="Title..."
          autoComplete="off"
          autoFocus
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={disabled ? "disabled-input" : ""}
        />
        <textarea
          placeholder="body..."
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        ></textarea>
        <hr />
        <div className="form-note__auctions">
          {props.formType === "edit" ? (
            <button
              className={`form-note__auctions-save ${
                disabled ? "disabled-button" : ""
              }`}
              type="button"
              onClick={() => props.onSaveChanges(formData)}
              disabled={disabled}
            >
              Save Changes
            </button>
          ) : (
            <>
              <button
                className={`form-note__auctions-save ${
                  disabled ? "disabled-button" : ""
                }`}
                type="submit"
                name="save"
                disabled={disabled}
              >
                Save
              </button>
              <button className="form-note__auctions-cancel" name="cancel">
                cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

AddForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  pinStatus: PropTypes.bool,
  formType: PropTypes.string,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onSaveChanges: PropTypes.func,
};

export default AddForm;
