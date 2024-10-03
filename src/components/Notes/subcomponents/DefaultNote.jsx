import { getDate } from "../../../utils/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Note.css";

function DefaultNote() {
  const message = `
  ### Hello, World
  - Add notes by clicking on the Add button at the top right.
  - [Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) syntax is supported.

  ### Markdown 
  Markdown is an easy-to-use markup language that is used with plain text to add formatting elements (headings, bulleted lists, URLs) to plain text without the use of a formal text editor or the use of HTML tags. Markdown is device agnostic and displays the writing format consistently across device types. to read the documentation click [here](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

  > **NOTE:** This extension uses your browser's local storage (\`storage.local - Mozilla\`) to store your notes. Please do not store passwords or sensitive data in this extension or any other browser extension. to learn more about local storage click [here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/local)

  to view the extensions source code click [here](https://github.com/Blnd-hussen/SimpleNotes/)
  `;
  return (
    <article className="note">
      <div className="note__timestamp">{getDate()}</div>
      <h2 className="note__title">Simple Notes</h2>
      <div className="note__body">
        <Markdown
          className="note__markdown-container"
          remarkPlugins={[remarkGfm]}
        >
          {message}
        </Markdown>
      </div>
      <hr />
    </article>
  );
}

export default DefaultNote;
