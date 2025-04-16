// flip.js
import { canvas } from './canvas.js';

export function setupFlip() {
  const btn = document.getElementById("flip");
  const options = document.getElementById("flipOptions");

  btn.addEventListener("click", e => {
    options.style.left = `${btn.offsetLeft}px`;
    options.style.top = `${btn.offsetTop + btn.offsetHeight}px`;
    options.style.display = options.style.display === "none" ? "block" : "none";
  });

  document.getElementById("flipVertical").addEventListener("click", () => flipObject("vertical"));
  document.getElementById("flipHorizontal").addEventListener("click", () => flipObject("horizontal"));

  document.addEventListener("click", e => {
    if (!btn.contains(e.target) && !options.contains(e.target)) {
      options.style.display = "none";
    }
  });
}

function flipObject(direction) {
  const obj = canvas.getActiveObject();
  if (!obj) return;

  const toggle = (prop) => el => el.set(prop, !el[prop]);

  if (obj.type === "group" || obj.type === "activeselection") {
    obj.getObjects().forEach(toggle(direction === "vertical" ? "flipY" : "flipX"));
  } else if (obj.clippedImage) {
    obj.clippedImage.set(direction === "vertical" ? "flipY" : "flipX", !obj.clippedImage[direction === "vertical" ? "flipY" : "flipX"]);
  } else {
    obj.set(direction === "vertical" ? "flipY" : "flipX", !obj[direction === "vertical" ? "flipY" : "flipX"]);
  }

  canvas.requestRenderAll();
  document.getElementById("flipOptions").style.display = "none";
}
