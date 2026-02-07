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

  const handleLock = async (noteId) => {
    try {
      const response = await browser.storage.local.get("notes");
      if (!response.notes) throw new Error("No notes were found");

      const notes = response.notes;
      const targetNote = notes.find((note) => note.id === noteId);

      if (targetNote) {
        if (targetNote.lockStatus) {
          const password = prompt("Enter password to unlock this note:");

          if (password === null) return;

          try {
            const titleBytes = CryptoJS.AES.decrypt(targetNote.title, password);
            const originalTitle = titleBytes.toString(CryptoJS.enc.Utf8);
            
            const bodyBytes = CryptoJS.AES.decrypt(targetNote.body, password);
            const originalBody = bodyBytes.toString(CryptoJS.enc.Utf8);

            if (!originalBody || !originalTitle) {
              alert("Incorrect password!");
              return;
            }

            targetNote.title = originalTitle;
            targetNote.body = originalBody;
            targetNote.lockStatus = false;
          } catch (e) {
            console.error("Decryption failed", e);
            alert("Error decrypting note.");
            return;
          }
        } else {
          const password = prompt("Set a password to lock this note:");

          if (!password) return;

          const cipherBody = CryptoJS.AES.encrypt(
            targetNote.body,
            password,
          ).toString();

          const cipherTitle = CryptoJS.AES.encrypt(
            targetNote.title,
            password,
          ).toString();

          targetNote.title = cipherTitle;
          targetNote.body = cipherBody;
          targetNote.lockStatus = true;
        }
      }

      await browser.storage.local.set({ notes: notes });
      props.onChange();
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
        onLock={handleLock}
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
