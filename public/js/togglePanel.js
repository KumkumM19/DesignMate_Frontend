export function togglePanel(panelId) {
   document.querySelectorAll(".sidebar").forEach(panel => panel.classList.remove("show"));
   document.getElementById(panelId).classList.toggle("show");
 }
 