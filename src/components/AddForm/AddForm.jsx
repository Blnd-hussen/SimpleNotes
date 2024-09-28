import { useState } from "react";

import "./AddForm.css";

function AddForm() {
  const [formData, setFormData] = useState({ title: "" }, { body: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <form className="form-note" onSubmit={handleSubmit}>
        <div className="form-note__timestamp">{new Date().getFullYear()}</div>
        <input
          type="text"
          placeholder="Title..."
          autoComplete="off"
          autoFocus
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="body..."
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        ></textarea>
        <hr />
        <div className="form-note__auctions">
          <button className="form-note__auctions-save" type="submit">Save</button>
          <button className="form-note__auctions-cancel">cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddForm;
