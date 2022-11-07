const COLORS = [
  { color: "#F2CB05", name: "#F2CB05" },
  { color: "#7D29F2", name: "#7D29F2" },
  { color: "#272755", name: "#272755" },
  { color: "#0798F2", name: "#0798F2" },
  { color: "#04BF55", name: "#04BF55" },
  { color: "#E25050", name: "#E25050" },
  { color: "#7F4C3B", name: "#7F4C3B" },
  { color: "#DA8300", name: "#DA8300" },
  { color: "#6161b1", name: "#6161b1" },
];
let drawing = false;
let redolist = [];
let undolist = [];

const init = (canvas, options) => {
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = options.color;
  ctx.lineWidth = options.lineWidth;
  drawing = false;
};

const getXY = (event, canvas) => {
  if (event && event.touches?.length) {
    event = event.touches[0];
  }
  let x = event.clientX;
  let y = event.clientY;
  // if (event.pageX || event.pageY) {
  //   x = event.pageX;
  //   y = event.pageY;
  // } else {
  //   x =
  //     event.clientX +
  //     document.body.scrollLeft +
  //     document.documentElement.scrollLeft;
  //   y =
  //     event.clientY +
  //     document.body.scrollTop +
  //     document.documentElement.scrollTop;
  // }
  x -= canvas.getBoundingClientRect().left;
  y -= canvas.getBoundingClientRect().top;
  return { x, y };
};
const start = (event, canvas) => {
  const { x, y } = getXY(event, canvas);

  const ctx = canvas.getContext("2d");

  drawing = true;
  ctx.beginPath();
  ctx.moveTo(x, y);
  saveState(canvas);
};

const drawText = (event, canvas, text, size, color) => {
  if (!undolist.length) {
    saveState(canvas);
  }
  const { x, y } = getXY(event, canvas);
  const ctx = canvas.getContext("2d");
  ctx.font = size + "px Serif";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(text, x, y + size / 4);
  saveState(canvas);
};

const stroke = (event, canvas, color) => {
  if (drawing) {
    const { x, y } = getXY(event, canvas);
    const ctx = canvas.getContext("2d");
    if (color) {
      console.log(color);
      ctx.strokeStyle = color;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const stop = (event) => {
  if (drawing) drawing = false;
};

const undo = (canvas, ctx) => {
  ctx = canvas.getContext("2d");
  restoreState(canvas, ctx, undolist, redolist);
};

const clear = (canvas, imgSrc) => {
  const img = document.createElement("img");
  const ctx = canvas.getContext("2d");
  redolist = [];
  undolist = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  img.src = imgSrc;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

const redo = (canvas, ctx) => {
  ctx = canvas.getContext("2d");
  restoreState(canvas, ctx, redolist, undolist);
};

const saveState = (canvas, list, keepRedo) => {
  keepRedo = keepRedo || false;
  if (!keepRedo) {
    redolist = [];
  }
  (list || undolist).push(canvas.toDataURL());
};

const restoreState = (canvas, ctx, pop, push) => {
  if (pop.length) {
    saveState(canvas, push, true);
  }
  const restore = pop[pop.length - 2];
  pop.pop();
  const canvasW = canvas.width;
  const canvasH = canvas.height;
  const img = document.createElement("img");
  img.src = restore;
  img.onload = () => {
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, 0, 0, canvasW, canvasH);
  };
};

export { COLORS, init, start, stroke, stop, undo, redo, clear, drawText };
