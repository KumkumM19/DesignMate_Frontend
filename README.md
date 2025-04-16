# 🎨 Modular Fabric.js Design Tool

A powerful, modular, **frontend-only design interface** built with [Fabric.js](https://fabricjs.com/). This project provides a drag-and-drop canvas where users can interactively add, style, align, group, and export shapes, images, and text objects — all in the browser.

---

## 📌 Features

- 🟦 **Add SVG Shapes** (click to load from `/assets`)
- 🖼 **Upload Images** from local file or URL
- ✏️ **Text Insertion** with editable properties
- 🎨 **Solid & Gradient Fill** options
- 🧲 **Snap to center** and to other objects
- ➕ **Drop shadows & borders**
- 🌀 **Flip, group, ungroup** objects
- 🧭 **Align & distribute** selected elements
- 🧱 **Layer control** using keyboard shortcuts
- 💾 **Export/import canvas as JSON**
- 📸 **Download canvas as PNG**
- ⌨️ **Keyboard support** for Delete, Ctrl+[], etc.

---

## 📁 Project Structure

```

## 🔍 Module Responsibilities

| File Name         | Responsibility                                                                 |
|-------------------|---------------------------------------------------------------------------------|
| `canvas.js`       | Initializes and exports the `fabric.Canvas` object                              |
| `main.js`         | Entry point that sets up event listeners and initializes all modules            |
| `togglePanel.js`  | Handles showing/hiding sidebars dynamically                                     |
| `shapes.js`       | Loads and adds SVG shapes to the canvas                                         |
| `image.js`        | Uploads images from local files or external URLs                                |
| `resize.js`       | Resizes selected object(s) based on input fields                                |
| `fill.js`         | Handles solid and gradient fill coloring                                        |
| `text.js`         | Adds and manages text elements                                                  |
| `border.js`       | Adds borders with color, style, and thickness                                   |
| `flip.js`         | Flips objects vertically or horizontally                                        |
| `shadow.js`       | Applies drop shadows with custom offsets and blur                               |
| `group.js`        | Groups and ungroups multiple selected objects                                   |
| `export.js`       | Exports canvas to JSON and imports from JSON                                    |
| `download.js`     | Exports the canvas as a downloadable PNG image                                  |
| `events.js`       | Global keyboard shortcuts like Delete, Layer control, and Delete Button handling|
| `layer.js`        | Controls z-index (bring forward/backward using Ctrl+Arrow keys)                 |
| `align.js`        | Aligns and distributes selected objects horizontally or vertically              |
| `snap.js`         | Snaps objects to center lines or nearby objects + shows guidelines              |
| `delete.js`       | Deletes selected objects (single/group/selection) on button click               |

project-root/
├── assets/              # Shape SVGs & images
├── public/
│   ├── index.html       # Main frontend page
│   ├── style.css        # UI styling
│   └── js/              # Modular JS files
│       ├── canvas.js
│       ├── togglePanel.js
│       ├── shapes.js
│       ├── image.js
│       ├── resize.js
│       ├── fill.js
│       ├── text.js
│       ├── border.js
│       ├── flip.js
│       ├── shadow.js
│       ├── group.js
│       ├── export.js
│       ├── download.js
│       ├── events.js
│       ├── layer.js
│       ├── align.js
│       ├── snap.js
│       ├── delete.js
│       └── main.js      # Entry point
├── package.json         # npm metadata
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fabric-design-tool.git
cd fabric-design-tool
```

### 2. Install Node Modules

```bash
npm install
```

### 3. Start the Local Dev Server

```bash
npm start
```

This will start the project at [http://localhost:3000](http://localhost:3000) using `lite-server`.

---

## ⚙️ Technologies Used

- **Fabric.js** – Canvas manipulation
- **HTML/CSS/JS** – UI and interactivity
- **Node.js + lite-server** – Dev server to serve files & support ES Modules

---

## 📦 Why Node.js?

Although there’s no backend code, Node is used to:

- Serve files over HTTP (ES Modules require it)
- Avoid CORS errors with assets
- Enable hot-reload using `lite-server`

---

## ⌨️ Keyboard Shortcuts

| Shortcut           | Action                   |
|--------------------|--------------------------|
| `Delete`           | Delete selected object(s)|
| `Ctrl + ]`         | Bring forward (layer up) |
| `Ctrl + [`         | Send backward (layer down)|

---

## ✅ To-Do / Future Features

- 🔠 Clip Image
- ⬛ Enhance Import JSON feature
- 🔁 Undo/redo history

---
