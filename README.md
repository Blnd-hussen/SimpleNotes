# SimpleNotes

**SimpleNotes** is a simple CRUD notes app with markdown support, built using React and RemarkJs.

Features:

Manage Notes Easily: Add, edit, delete, and pin notes with just a few clicks. Your notes are stored locally in your browser, so they're always safe and available.

Search Your Notes: Quickly find what you're looking for by typing in the search bar. It filters your notes by title, so you don't have to scroll forever.

Copy to Clipboard: Easily copy your note's content to the clipboard for quick sharing.

Simple Interface: A clean and straightforward design makes it easy to switch between taking notes.

How to Use:

- Add Notes: Click on the add icon at the top right to create a new note Just fill in the title and body, then save it.
- Edit Notes: Click the edit icon on any note to make changes.
- Delete Notes: Get rid of notes you don't need by clicking the delete icon.
- Pin Notes: Click the pin icon on any note to keep it at the top.

## Prerequisites, Installation, and Build Instructions

### Prerequisites

- **Node.js**: Version 16.x.x or higher
- **npm**: Bundled with Node.js version 16
- **Vite**: vite@latest

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Blnd-hussen/SimpleNotes/
   cd SimpleNotes
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the extension: Run the following command to create a production-ready build of the extension.

   ```bash
   npm run build
   ```

4. Package the extension:

   ```bash
   cd dist
   zip -r extension.zip *
   ```

### Build Instructions

The build process is managed by Vite. To build the project, the following command is used:

```bash
npm run build
```

### Operating Systems

This extension can be built on the following operating systems:

- **Windows**: Tested on Windows 10 and later
- **Linux**: Tested on Ubuntu 20.04 and later

### Build Environment Requirements

1. **Node.js** (version 16.x.x)

   - Download from: [https://nodejs.org/](https://nodejs.org/)
   - Check if Node.js is installed by running:

   ```bash
   node --version
   ```

2. **npm** (bundled with Node.js version 16)

   - To check the version, run:

   ```bash
   npm --version
   ```

3. **Vite** (version 3.x.x or higher)

   - Vite is used for building the project and will be installed automatically when running:

   ```bash
   npm install
   ```

4. **ZIP Utility**

   - This is required to package the `dist/` directory into a `.zip` file for distribution.

   - **Linux/macOS**: The `zip` command is available by default. To zip your build, run:

   ```bash
   zip -r my-extension.zip .
   ```
