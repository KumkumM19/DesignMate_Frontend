import { canvas } from './canvas.js';

export function deleteSelected() {
  const obj = canvas.getActiveObject();
  if (!obj) return;

  if (obj.type === "activeselection") {
    obj.getObjects().forEach(o => canvas.remove(o));
  } else if (obj.type === "group") {
    obj._objects.forEach(o => canvas.remove(o));
    canvas.remove(obj);
  } else {
    canvas.remove(obj);
  }

  canvas.discardActiveObject();
  canvas.requestRenderAll();
}
