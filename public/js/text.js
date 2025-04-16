// text.js
import { canvas } from './canvas.js';

export function setupText() {
  document.getElementById("addText").addEventListener("click", () => {
    const textBox = new fabric.Textbox("Add your text here", {
      left: 200, top: 200, fontSize: 20, width: 200,
      fill: "#000", borderColor: "#000",
      cornerStyle: "circle", cornerSize: 10
    });
    canvas.add(textBox);
    canvas.setActiveObject(textBox);
    canvas.requestRenderAll();
  });
}
