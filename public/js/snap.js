import { canvas } from './canvas.js';

const SNAP_THRESHOLD = 5;
let guidelines = [];

let horizontalGuide, verticalGuide;
let centerX, centerY;

export function setupSnapToGrid() {
  initializeCenterGuides();

  canvas.on('object:moving', function (e) {
    clearGuidelines();
    const obj = e.target;

    updateObjectSnapping(obj);
    updateGuidelines(obj);
  });

  canvas.on('object:modified', function () {
    clearGuidelines();
  });
}

function initializeCenterGuides() {
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;

  horizontalGuide = new fabric.Line([0, centerY, canvas.width, centerY], {
    stroke: 'blue',
    strokeWidth: 0.5,
    selectable: false,
    evented: false,
    opacity: 0,
  });

  verticalGuide = new fabric.Line([centerX, 0, centerX, canvas.height], {
    stroke: 'blue',
    strokeWidth: 0.5,
    selectable: false,
    evented: false,
    opacity: 0,
  });

  canvas.add(horizontalGuide, verticalGuide);
}

function updateGuidelines(target) {
  const left = target.left;
  const right = left + target.width * target.scaleX;
  const top = target.top;
  const bottom = top + target.height * target.scaleY;
  const centerObjectX = left + (target.width * target.scaleX) / 2;
  const centerObjectY = top + (target.height * target.scaleY) / 2;

  let showHorizontal = false;
  let showVertical = false;

  if (Math.abs(left - centerX) <= SNAP_THRESHOLD) {
    target.left = centerX;
    showVertical = true;
  } else if (Math.abs(right - centerX) <= SNAP_THRESHOLD) {
    target.left = centerX - target.width * target.scaleX;
    showVertical = true;
  } else if (Math.abs(centerObjectX - centerX) <= SNAP_THRESHOLD) {
    target.left = centerX - target.width * target.scaleX / 2;
    showVertical = true;
  }

  if (Math.abs(top - centerY) <= SNAP_THRESHOLD) {
    target.top = centerY;
    showHorizontal = true;
  } else if (Math.abs(bottom - centerY) <= SNAP_THRESHOLD) {
    target.top = centerY - target.height * target.scaleY;
    showHorizontal = true;
  } else if (Math.abs(centerObjectY - centerY) <= SNAP_THRESHOLD) {
    target.top = centerY - target.height * target.scaleY / 2;
    showHorizontal = true;
  }

  horizontalGuide.set({ opacity: showHorizontal ? 1 : 0 });
  verticalGuide.set({ opacity: showVertical ? 1 : 0 });

  canvas.requestRenderAll();
}

function updateObjectSnapping(target) {
  let snapX = false, snapY = false;
  let minDistX = SNAP_THRESHOLD, minDistY = SNAP_THRESHOLD;
  let snapPositions = { left: null, top: null, right: null, bottom: null, centerX: null, centerY: null };

  canvas.getObjects().forEach(obj => {
    if (
      obj === target ||
      obj === horizontalGuide ||
      obj === verticalGuide ||
      !obj.visible ||
      obj.left < -1000 || obj.top < -1000 ||
      obj.group
    ) return;

    const movingCoords = getObjectCoords(target);
    const staticCoords = getObjectCoords(obj);

    ['left', 'centerX', 'right'].forEach(pos => {
      ['left', 'centerX', 'right'].forEach(otherPos => {
        let diff = Math.abs(movingCoords[pos] - staticCoords[otherPos]);
        if (diff < minDistX) {
          minDistX = diff;
          snapX = true;
          snapPositions[pos] = staticCoords[otherPos];
        }
        if (diff < SNAP_THRESHOLD) {
          drawGuideline(staticCoords[otherPos], 'vertical', obj, target);
        }
      });
    });

    ['top', 'centerY', 'bottom'].forEach(pos => {
      ['top', 'centerY', 'bottom'].forEach(otherPos => {
        let diff = Math.abs(movingCoords[pos] - staticCoords[otherPos]);
        if (diff < minDistY) {
          minDistY = diff;
          snapY = true;
          snapPositions[pos] = staticCoords[otherPos];
        }
        if (diff < SNAP_THRESHOLD) {
          drawGuideline(staticCoords[otherPos], 'horizontal', obj, target);
        }
      });
    });
  });

  let updatedLeft = target.left;
  let updatedTop = target.top;

  if (snapPositions.left !== null) updatedLeft = snapPositions.left;
  if (snapPositions.right !== null) updatedLeft = snapPositions.right - target.width * target.scaleX;
  if (snapPositions.centerX !== null) updatedLeft = snapPositions.centerX - target.width * target.scaleX / 2;

  if (snapPositions.top !== null) updatedTop = snapPositions.top;
  if (snapPositions.bottom !== null) updatedTop = snapPositions.bottom - target.height * target.scaleY;
  if (snapPositions.centerY !== null) updatedTop = snapPositions.centerY - target.height * target.scaleY / 2;

  target.set({ left: updatedLeft, top: updatedTop });
  canvas.requestRenderAll();
}

function getObjectCoords(obj) {
  return {
    left: obj.left,
    centerX: obj.left + (obj.width * obj.scaleX) / 2,
    right: obj.left + obj.width * obj.scaleX,
    top: obj.top,
    centerY: obj.top + (obj.height * obj.scaleY) / 2,
    bottom: obj.top + obj.height * obj.scaleY,
  };
}

function drawGuideline(position, type, obj1, obj2) {
  let line;
  if (type === 'vertical') {
    const minY = Math.min(obj1.top, obj2.top);
    const maxY = Math.max(obj1.top + obj1.height * obj1.scaleY, obj2.top + obj2.height * obj2.scaleY);
    line = new fabric.Line([position, minY, position, maxY], {
      stroke: 'red',
      strokeWidth: 0.5,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
    });
  } else {
    const minX = Math.min(obj1.left, obj2.left);
    const maxX = Math.max(obj1.left + obj1.width * obj1.scaleX, obj2.left + obj2.width * obj2.scaleX);
    line = new fabric.Line([minX, position, maxX, position], {
      stroke: 'red',
      strokeWidth: 0.5,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
    });
  }

  canvas.add(line);
  guidelines.push(line);
}

function clearGuidelines() {
  guidelines.forEach(line => canvas.remove(line));
  guidelines = [];

  horizontalGuide.set({ opacity: 0 });
  verticalGuide.set({ opacity: 0 });
}

 