import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import browser from "webextension-polyfill";

import "./AddForm.css";

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
    title: "",
    body: "",
    pinStatus: false,
    date: getDate(),
  });
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const action = event.nativeEvent.submitter.name;

    if (action === "save") {
      browser.storage.local
        .set({ note: formData })
        .then(() => {
          console.log("note saved");
        })
        .catch((err) => {
          console.error(err);
        });
      props.onClose();
    } else {
      props.onClose();
    }
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
        </div>
      </form>
    </div>
  );
}

AddForm.propTypes = {
  onClose: PropTypes.func,
};

export default AddForm;
