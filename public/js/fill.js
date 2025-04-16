import { canvas } from './canvas.js';

export function setupFill() {
  ["solidFillRadio", "gradientFillRadio"].forEach(id =>
    document.getElementById(id).addEventListener("change", toggleFillType)
  );
  ["colorPicker", "gradientColorPicker1", "gradientColorPicker2"].forEach(id =>
    document.getElementById(id).addEventListener("input", applyFill)
  );
  toggleFillType();
}

function toggleFillType() {
   let obj = canvas.getActiveObject();
   if (!obj) return;

   let isSolid = document.getElementById("solidFillRadio").checked;
   let solidColorInput = document.getElementById("colorPicker");
   let gradientColorInput1 = document.getElementById("gradientColorPicker1");
   let gradientColorInput2 = document.getElementById("gradientColorPicker2");

   function applyToObject(obj){
   if (isSolid) {
       // Switching to Solid Fill → Take the first gradient color as solid
       if (obj.fill?.colorStops) {
           solidColorInput.value = obj.fill.colorStops[0].color; 
       }
   } else {
       // Switching to Gradient Fill → Use two analogous colors of the solid color
       let baseColor = solidColorInput.value;
       let analogousColors = getAnalogousColors(baseColor);

       gradientColorInput1.value = analogousColors[0]; 
       gradientColorInput2.value = analogousColors[1];
   }
}

   if (obj.type === "activeselection" || obj.type==="group") {
       obj.getObjects().forEach((item) => applyToObject(item));
   } else {
       applyToObject(obj);
   }

   // Show/hide sections accordingly
   document.getElementById("solidColorSection").style.display = isSolid ? "block" : "none";
   document.getElementById("gradientColorSection").style.display = isSolid ? "none" : "block";
   applyFill(); // Apply the fill change immediately
}

function applyFill() {
   let obj = canvas.getActiveObject();
   if (!obj) return;

   let isSolid = document.getElementById("solidFillRadio").checked;
   let solidColor = document.getElementById("colorPicker").value;
   let gradientColor1 = document.getElementById("gradientColorPicker1").value;
   let gradientColor2 = document.getElementById("gradientColorPicker2").value;

   function applyFillToObject(obj){
   if (isSolid) {
       obj.set("fill", solidColor);
   } else {
       let gradient = new fabric.Gradient({
           type: "linear",
           gradientUnits: "pixels",
           coords: { x1: 0, y1: 0, x2: obj.width * obj.scaleX, y2: obj.height * obj.scaleY }, // Horizontal gradient
           colorStops: [
               { offset: 0, color: gradientColor1 },
               { offset: 1, color: gradientColor2 }
           ]
       });
       obj.set("fill", gradient);
   }
}

   if (obj.type === "activeselection") {
       obj.getObjects().forEach((item) => applyFillToObject(item));
   } else if (obj.type === "group") {
       obj._objects.forEach((item) => applyFillToObject(item));
   } else {
       applyFillToObject(obj);
   }
   canvas.requestRenderAll();
}

// Function to get two analogous colors of a given hex color
function getAnalogousColors(hex) {
   let hsl = hexToHSL(hex);

   let randomShift = Math.floor(Math.random() * 61) + 20;
   let color1 = HSLToHex(hsl.h, hsl.s, hsl.l);
   let color2 = HSLToHex((hsl.h + randomShift) % 360, hsl.s, hsl.l);

   return [color1, color2];
}

// Convert Hex to HSL
function hexToHSL(hex) {
   let r = parseInt(hex.slice(1, 3), 16) / 255;
   let g = parseInt(hex.slice(3, 5), 16) / 255;
   let b = parseInt(hex.slice(5, 7), 16) / 255;

   let max = Math.max(r, g, b);
   let min = Math.min(r, g, b);
   let h, s, l = (max + min) / 2;

   if (max === min) {
       h = s = 0; // Achromatic
   } else {
       let d = max - min;
       s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

       switch (max) {
           case r: h = (g - b) / d + (g < b ? 6 : 0); break;
           case g: h = (b - r) / d + 2; break;
           case b: h = (r - g) / d + 4; break;
       }
       h *= 60;
   }
   return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Convert HSL to Hex
function HSLToHex(h, s, l) {
   s /= 100;
   l /= 100;

   let c = (1 - Math.abs(2 * l - 1)) * s;
   let x = c * (1 - Math.abs((h / 60) % 2 - 1));
   let m = l - c / 2;
   let r, g, b;

   if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
   else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
   else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
   else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
   else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
   else [r, g, b] = [c, 0, x];

   r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
   g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
   b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

   return `#${r}${g}${b}`;
}

