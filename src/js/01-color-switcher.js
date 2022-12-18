function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
let timerId = null;
startBtnEl.addEventListener('click', onStartBtn);
stopBtnEl.addEventListener('click',  onstopBtnEl);
function onStartBtn() {
   timerId = setInterval(() => {
  bodyEl.style.backgroundColor = getRandomHexColor();
   }, 1000);
  startBtnEl.setAttribute('disabled', 'disabled');
}
function onstopBtnEl() {
  clearInterval(timerId);
  startBtnEl.removeAttribute('disabled', 'disabled');
}
