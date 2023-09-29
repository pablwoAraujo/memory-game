// StopWatch
let currentTime = 0;
let stopWatchTimer = setInterval(stopwatch, 1000);
let stopwatchElement = document.querySelector("#stopwatch");

function stopwatch() {
  currentTime++;
  stopwatchElement.textContent = format(currentTime);
}

function format(time) {
  let number = time;
  let hours = Math.floor(number / 3600);
  let minutes = Math.floor((number - (hours*3600)) / 60);
  let seconds = number - (hours*3600) - (minutes*60);

  return `${toLocaleString(hours)}:${toLocaleString(minutes)}:${toLocaleString(seconds)}`;
}

function toLocaleString(value) {
  return value.toLocaleString("pt-BR", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
// 

const emojis = [
  "🐶",
  "🐶",
  "🐱",
  "🐱",
  "🐭",
  "🐭",
  "🐼",
  "🐼",
  "🐮",
  "🐮",
  "🐷",
  "🐷",
  "🐸",
  "🐸",
  "🐵",
  "🐵",
];

let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

function handleClick() {
  if (
    openCards.length < 2 &&
    !this.classList.contains("boxMatch") &&
    !this.classList.contains("boxOpen")
  ) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }
  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    clearInterval(stopWatchTimer);
    alert(`Parabéns, você concluiu o jogo em ${format(currentTime)}!`);
  }
}