import { canvas } from './canvas.js';

export function setupExportImport() {
  document.getElementById("exportCanvas").addEventListener("click",exportCanvas);
  document.getElementById("importCanvas").addEventListener("click", () => document.getElementById("fileInput").click());
  document.getElementById("fileInput").addEventListener("change", importCanvas);
}

function exportCanvas() {
   let json = JSON.stringify(canvas.toJSON());
   let blob = new Blob([json], { type: "application/json" });
   let a = document.createElement("a");
   a.href = URL.createObjectURL(blob);
   a.download = "canvas-design.json";
   a.click();
}

function importCanvas(event) {
   let file = event.target.files[0];
   if (!file) return;

   let reader = new FileReader();
   reader.onload = function(e) {
       let json = e.target.result;
       canvas.loadFromJSON(json, () => {
         canvas.requestRenderAll();
        });
       }
   reader.readAsText(file);
}
