// shadow.js
import { canvas } from './canvas.js';

export function setupShadow() {
  ["shadowColor", "shadowOffsetX", "shadowOffsetY", "shadowBlur"].forEach(id => {
    document.getElementById(id).addEventListener("input", applyDropShadow);
  });
}

function applyDropShadow() {
  const obj = canvas.getActiveObject();
  if (!obj) return;

  const shadow = new fabric.Shadow({
    color: document.getElementById("shadowColor").value,
    offsetX: parseInt(document.getElementById("shadowOffsetX").value) || 0,
    offsetY: parseInt(document.getElementById("shadowOffsetY").value) || 0,
    blur: parseInt(document.getElementById("shadowBlur").value) || 0,
  });

  if (obj.type === "activeselection" || obj.type === "group") {
    obj.getObjects().forEach(o => o.set({ shadow }));
  } else {
    obj.set({ shadow });
  }

  canvas.requestRenderAll();
}
