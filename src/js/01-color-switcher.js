function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

const COLOR_CHANGING_DELAY = 1000;
let timeOut;

refs.startBtn.addEventListener('click', onBtnStart);
refs.stopBtn.addEventListener('click', onBtnStop);

function onBtnStart() {
  timeOut = setInterval(changingColor, COLOR_CHANGING_DELAY);
  refs.startBtn.disabled = true;
}

function onBtnStop() {
  stopChangingColor();
  refs.startBtn.disabled = false;
}

function changingColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function stopChangingColor() {
  clearInterval(timeOut);
}
