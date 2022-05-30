const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  let x = event.offsetX;
  let y = event.offsetY;

  if (!painting) {
    ctx.beginPath(); //해당 코드 삭제 시 이전 좌표 경로로 지정됨
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

//캔버스로 들어왔을 때 시작점 위치 변경
function onMouseEnter(event) {
  x = event.offsetX;
  y = event.offsetY;

  ctx.moveTo(x, y);
}

if (canvas) {
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseenter", onMouseEnter);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

function handleCM(event) {
  event.preventDefault();
}

function handleCanvasClick() {
  if (!filling) {
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "testing";
  link.click();
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
