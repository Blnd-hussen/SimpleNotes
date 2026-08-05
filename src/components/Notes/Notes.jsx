import Note from "./subcomponents/Note";
import NoteForm from "../NoteForm/NoteForm";
import "./Notes.css";

import PropTypes from "prop-types";
import CryptoJS from "crypto-js";
import browser from "webextension-polyfill";
import { useState } from "react";

function Notes(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [isLocking, setIsLocking] = useState(false);
  const [lockNoteId, setLockNoteId] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

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

  const openLockDialog = (noteId) => {
    setLockNoteId(noteId);
    setIsLocking(true);
    setPasswordInput("");
    setPasswordError(false);
  };

  const processLockToggle = async () => {
    try {
      const response = await browser.storage.local.get("notes");
      const notes = response.notes;
      const targetNote = notes.find((n) => n.id === lockNoteId);

      if (targetNote.lockStatus) {
        try {
          const titleBytes = CryptoJS.AES.decrypt(
            targetNote.title,
            passwordInput,
          );
          const originalTitle = titleBytes.toString(CryptoJS.enc.Utf8);
          const bodyBytes = CryptoJS.AES.decrypt(
            targetNote.body,
            passwordInput,
          );
          const originalBody = bodyBytes.toString(CryptoJS.enc.Utf8);

          if (!originalTitle) {
            setPasswordError(true);
            return;
          }

          targetNote.title = originalTitle;
          targetNote.body = originalBody;
          targetNote.lockStatus = false;
        } catch {
          setPasswordError(true);
          return;
        }
      } else {
        if (!passwordInput) return;
        targetNote.title = CryptoJS.AES.encrypt(
          targetNote.title,
          passwordInput,
        ).toString();
        targetNote.body = CryptoJS.AES.encrypt(
          targetNote.body,
          passwordInput,
        ).toString();
        targetNote.lockStatus = true;
      }

      await browser.storage.local.set({ notes });
      props.onChange();
      setIsLocking(false);
    } catch (err) {
      console.error(err);
    }
  };

  const openEditForm = async (noteId) => {
    try {
      const response = await browser.storage.local.get("notes");
      if (!response.notes) {
        throw new Error("No notes found!");
      }

      const note = response.notes.find((note) => note.id === noteId);
      setEditNote(note);
      setIsEditing(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (formData) => {
    try {
      const response = await browser.storage.local.get("notes");
      if (!response.notes) {
        throw new Error("no notes were found!");
      }

      const savedNotes = response.notes;
      const editNoteId = formData.id;
      const targetNote = savedNotes.find((note) => note.id === editNoteId);

      if (
        targetNote.title !== formData.title ||
        targetNote.body !== formData.body
      ) {
        targetNote.title = formData.title;
        targetNote.body = formData.body;
        targetNote.created = formData.created;
        await browser.storage.local.set({ notes: savedNotes });
        props.onChange();
      }
      setIsEditing(false);
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
        pinStatus={note.pinStatus}
        lockStatus={note.lockStatus}
        body={note.body}
        onDelete={handleDelete}
        onPin={handlePin}
        onEdit={openEditForm}
        onLock={openLockDialog}
      />
    );

    if (note.pinStatus) pinList.push(currentNote);
    else noteList.push(currentNote);
  });

  return (
    <>
      {isEditing && (
        <NoteForm
          id={editNote.id}
          title={editNote.title}
          body={editNote.body}
          formType="edit"
          onSaveChanges={handleEdit}
        />
      )}
      {pinList.length > 0 && <div className="pined-notes">{pinList}</div>}

      <div className="notes">
        {noteList}
        {props.children}
      </div>

      {isLocking && (
        <>
          <dialog open className="password-dialog">
            <form
              className="dialog-content"
              onSubmit={(e) => {
                e.preventDefault();
                processLockToggle();
              }}
            >
              <h4>
                {passwordError ? (
                  <span style={{ color: "var(--danger-color)" }}>
                    Incorrect Password
                  </span>
                ) : props.notes.find((n) => n.id === lockNoteId)?.lockStatus ? (
                  "Unlock Note"
                ) : (
                  "Set Password"
                )}
              </h4>
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (passwordError) setPasswordError(false);
                }}
                style={
                  passwordError
                    ? {
                        outline: "2px solid var(--danger-color)",
                      }
                    : {}
                }
                autoFocus
              />

              <div className="dialog-actions">
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={() => setIsLocking(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="confirm-btn"
                  onClick={processLockToggle}
                  disabled={!passwordInput.trim()}
                  style={{
                    opacity: passwordInput.trim() ? 1 : 0.8,
                    cursor: passwordInput.trim() ? "pointer" : "not-allowed",
                  }}
                >
                  Confirm
                </button>
              </div>
            </form>
          </dialog>
          <div className="backdrop"></div>
        </>
      )}
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
      lockStatus: PropTypes.bool || false,
    }),
  ),
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default Notes;
