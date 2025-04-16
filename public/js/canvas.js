export const canvas = new fabric.Canvas(document.getElementById("fabricCanvas"), {
   width: 800,
   height: 500,
   backgroundColor: "#f0f0f0"
 });
 canvas.preserveObjectStacking = true;
 canvas.requestRenderAll();
 