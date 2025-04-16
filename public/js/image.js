import { canvas } from './canvas.js';

export function setupImageUpload() {
  document.getElementById("imageInput").addEventListener("change", async (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.onload = async f => {
        const img = await fabric.Image.fromURL(f.target.result);
        img.set({ left: 100, top: 100, scaleX: 1, scaleY: 1 });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.requestRenderAll();
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById("addImageFromURL").addEventListener("click", async () => {
    const url = document.getElementById("imageURL").value;
    if (!url) return;
    const img = await fabric.Image.fromURL(url);
    img.set({ left: Math.random() * 300, top: Math.random() * 300, scaleX: 1, scaleY: 1 });
    canvas.add(img);
    canvas.setActiveObject(img);
    canvas.requestRenderAll();
  });
}
