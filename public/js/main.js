import { canvas } from "./canvas.js";
import { togglePanel } from './togglePanel.js';
import { loadShapes } from './shapes.js';
import { setupImageUpload } from './image.js';
import { setupFill } from './fill.js';
import { setupText } from './text.js';
import { setupBorder } from './border.js';
import { setupFlip } from './flip.js';
import { setupShadow } from './shadow.js';
import { setupGrouping } from './group.js';
import { setupExportImport } from './export.js';
import { setupDownload } from './download.js';
import { setupEvents } from './events.js';
import { deleteSelected } from './delete.js';
import { setupAlignment } from "./align.js";
import { setupSnapToGrid } from './snap.js';



document.getElementById("toggleShapes").addEventListener("click", () => {
  togglePanel("shapePanel");
  loadShapes();
});
document.getElementById("uploadImage").addEventListener("click", () => togglePanel("imageUploadPanel"));
document.getElementById("toggleColor").addEventListener("click", () => togglePanel("colorPanel"));
document.getElementById("toggleText").addEventListener("click", () => togglePanel("textPanel"));
document.getElementById("borderButton").addEventListener("click", () => togglePanel("borderPanel"));
document.getElementById("align").addEventListener("click",() => togglePanel("alignmentPanel"));
document.getElementById("dropShadow").addEventListener("click", () => togglePanel("dropShadowPanel"));
document.getElementById("deleteBtn").addEventListener("click", () => deleteSelected());

setupImageUpload();
setupFill();
setupText();
setupBorder();
setupFlip();
setupShadow();
setupGrouping();
setupExportImport();
setupDownload();
setupEvents();
setupAlignment();
setupSnapToGrid();
