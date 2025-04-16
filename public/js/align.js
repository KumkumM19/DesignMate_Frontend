import { canvas } from './canvas.js';

export function setupAlignment() {
  document.getElementById("alignLeft").addEventListener("click", () => alignObject("left"));
  document.getElementById("alignCenterX").addEventListener("click", () => alignObject("centerX"));
  document.getElementById("alignRight").addEventListener("click", () => alignObject("right"));
  document.getElementById("alignTop").addEventListener("click", () => alignObject("top"));
  document.getElementById("alignCenterY").addEventListener("click", () => alignObject("centerY"));
  document.getElementById("alignBottom").addEventListener("click", () => alignObject("bottom"));

  document.getElementById("distributeHorizontal").addEventListener("click", () => distributeObjects("horizontal"));
  document.getElementById("distributeVertical").addEventListener("click", () => distributeObjects("vertical"));
}

/**
 * Aligns objects either to canvas (single object) or relative to one another (multi-selection)
 */
function alignObject(alignment) {
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;

  if (activeObject.type === "activeselection") {
    const objects = activeObject.getObjects();
    if (objects.length < 2) return;

    let referenceObject = objects[0];

    if (["left", "top"].includes(alignment)) {
      referenceObject = objects.reduce((min, obj) =>
        alignment === "left" ? (obj.left < min.left ? obj : min) : (obj.top < min.top ? obj : min)
      );
    } else if (["right", "bottom"].includes(alignment)) {
      referenceObject = objects.reduce((max, obj) => {
        const currentVal = alignment === "right" ? obj.left + obj.width * obj.scaleX : obj.top + obj.height * obj.scaleY;
        const maxVal = alignment === "right" ? max.left + max.width * max.scaleX : max.top + max.height * max.scaleY;
        return currentVal > maxVal ? obj : max;
      });
    } else if (["centerX", "centerY"].includes(alignment)) {
      referenceObject = objects.reduce((min, obj) => {
        const currentVal = alignment === "centerX"
          ? obj.left + (obj.width * obj.scaleX) / 2
          : obj.top + (obj.height * obj.scaleY) / 2;
        const minVal = alignment === "centerX"
          ? min.left + (min.width * min.scaleX) / 2
          : min.top + (min.height * min.scaleY) / 2;
        return currentVal < minVal ? obj : min;
      });
    }

    objects.forEach(obj => {
      if (obj === referenceObject) return;

      switch (alignment) {
        case "left":
          obj.left = referenceObject.left;
          break;
        case "centerX":
          obj.left = referenceObject.left + (referenceObject.width * referenceObject.scaleX - obj.width * obj.scaleX) / 2;
          break;
        case "right":
          obj.left = referenceObject.left + referenceObject.width * referenceObject.scaleX - obj.width * obj.scaleX;
          break;
        case "top":
          obj.top = referenceObject.top;
          break;
        case "centerY":
          obj.top = referenceObject.top + (referenceObject.height * referenceObject.scaleY - obj.height * obj.scaleY) / 2;
          break;
        case "bottom":
          obj.top = referenceObject.top + referenceObject.height * referenceObject.scaleY - obj.height * obj.scaleY;
          break;
      }
      obj.setCoords();
    });

    const newSelection = new fabric.ActiveSelection(objects, { canvas });
    canvas.setActiveObject(newSelection);
  } else {
    // Single object alignment to canvas
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    switch (alignment) {
      case "left":
        activeObject.left = 0;
        break;
      case "centerX":
        activeObject.left = (canvasWidth - activeObject.width * activeObject.scaleX) / 2;
        break;
      case "right":
        activeObject.left = canvasWidth - activeObject.width * activeObject.scaleX;
        break;
      case "top":
        activeObject.top = 0;
        break;
      case "centerY":
        activeObject.top = (canvasHeight - activeObject.height * activeObject.scaleY) / 2;
        break;
      case "bottom":
        activeObject.top = canvasHeight - activeObject.height * activeObject.scaleY;
        break;
    }

    activeObject.setCoords();
  }

  canvas.requestRenderAll();
}

/**
 * Distributes selected objects evenly (horizontal or vertical)
 */
function distributeObjects(direction) {
  const activeObjects = canvas.getActiveObjects();
  if (!activeObjects || activeObjects.length < 3) return;

  const sorted = [...activeObjects].sort((a, b) =>
    direction === "horizontal" ? a.left - b.left : a.top - b.top
  );

  const totalSize = sorted.reduce((sum, obj) =>
    sum + (direction === "horizontal" ? obj.width * obj.scaleX : obj.height * obj.scaleY), 0
  );

  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const range = (direction === "horizontal"
    ? last.left + last.width * last.scaleX
    : last.top + last.height * last.scaleY) - (direction === "horizontal" ? first.left : first.top);

  const spacing = (range - totalSize) / (sorted.length - 1);

  let currentPos = direction === "horizontal" ? first.left : first.top;

  sorted.forEach((obj, i) => {
    if (i === 0) return;

    currentPos += direction === "horizontal"
      ? sorted[i - 1].width * sorted[i - 1].scaleX + spacing
      : sorted[i - 1].height * sorted[i - 1].scaleY + spacing;

    if (direction === "horizontal") obj.left = currentPos;
    else obj.top = currentPos;

    obj.setCoords();
  });

  canvas.requestRenderAll();
}
