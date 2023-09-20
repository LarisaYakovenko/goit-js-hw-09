const refs = {
  startBtn: document.querySelector("button[data-start]"),
  stopBtn: document.querySelector("button[data-stop]"),
  body: document.querySelector("body"),
}

let timerId = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener("click", () => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  timerId = setInterval(() => {

    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

refs.stopBtn.addEventListener("click", () => {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(timerId);
})