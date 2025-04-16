import { canvas } from "./canvas.js";

export function loadShapes() {
  const shapeFiles = [...Array(20)].map((_, i) => `shape-${i + 1}.svg`);
  const shapeContainer = document.getElementById("shapeContainer");
  shapeContainer.innerHTML = "";

  shapeFiles.forEach((file) => {
    const shapeBtn = document.createElement("img");
    shapeBtn.src = `/assets/${file}`;
    shapeBtn.classList.add("shape-thumbnail");
    shapeBtn.setAttribute("data-shape", file);
    shapeBtn.addEventListener("click", () => addSVGShape(file));
    shapeContainer.appendChild(shapeBtn);
  });
}

function addSVGShape(fileName) {
  fabric
    .loadSVGFromURL(`assets/${fileName}`)
    .then(({ objects, options }) => {
      const shape = objects.length > 1 ? new fabric.Group(objects, options) : objects[0];
      shape.set({ left: 150, top: 150, scaleX: 1, scaleY: 1, selectable: true });
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.requestRenderAll();
    })
    .catch((err) => console.error("SVG load error:", err));
}
