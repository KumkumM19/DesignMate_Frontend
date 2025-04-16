import { canvas } from './canvas.js';

export function setupDownload() {
  document.getElementById("downloadImage").addEventListener("click", () => {
    const dataURL = canvas.toDataURL({ format: "png", multiplier: 2 });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas-export.png";
    link.click();
  });
}
