import { canvas } from './canvas.js';
import { deleteSelected } from './delete.js';

export function setupEvents() {
  document.addEventListener("keydown", e => {
    const obj = canvas.getActiveObject();
    if (!obj) return;

    if (e.key === "Delete") {
      deleteSelected();
    }

    if (e.key === "[") moveLayer(obj, "down");
    if (e.key === "]") moveLayer(obj, "up");
  });
}

function moveLayer(obj, direction) {
  if (obj.type === "activeselection") {
    obj.getObjects().forEach(o => {
      direction === "up" ? canvas.bringObjectToFront(o) :  canvas.sendObjectToBack(o);
    });
  } else {
    direction === "up" ? canvas.bringObjectToFront(obj) :  canvas.sendObjectToBack(obj);
  }
  canvas.requestRenderAll();
}
