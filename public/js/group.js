import { canvas } from './canvas.js';

export function setupGrouping() {
  document.getElementById("groupBtn").addEventListener("click", () => {
    const active = canvas.getActiveObject();
    if (!active || !(active.type === "activeselection")) return;
    const group = new fabric.Group(active.removeAll());
    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.requestRenderAll();
    console.log(canvas.getObjects());
  });

document.getElementById("ungroupBtn").addEventListener("click", () => {
    const group = canvas.getActiveObject();
    if (!group || group.type !== "group") return;
    canvas.remove(group);
    const selection = new fabric.ActiveSelection(group._objects, { canvas });
    canvas.setActiveObject(selection);
    canvas.requestRenderAll();
  });
}



 

 
