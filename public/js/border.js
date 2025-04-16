// border.js
import { canvas } from './canvas.js';

export function setupBorder() {
  ["borderColorPicker", "borderStyle", "borderThickness"].forEach(id => {
    document.getElementById(id).addEventListener("input", updateBorder);
    document.getElementById(id).addEventListener("change", updateBorder);
  });
}

function updateBorder() {
  const obj = canvas.getActiveObject();
  if (!obj) return;

  const color = document.getElementById("borderColorPicker").value;
  const thickness = parseInt(document.getElementById("borderThickness").value, 10);
  const style = document.getElementById("borderStyle").value;

  const applyStroke = el => {
    el.set({
      stroke: style === "none" ? null : color,
      strokeWidth: thickness,
      strokeDashArray: style === "dashed" ? [10, 5] : style === "dotted" ? [2, 5] : null
    });
    el.setCoords();
  };

  if (obj.type === "group" || obj.type === "activeselection") {
    obj.getObjects().forEach(applyStroke);
  } else {
    applyStroke(obj);
  }

  canvas.requestRenderAll();
}
