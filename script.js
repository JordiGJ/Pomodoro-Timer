// get elements
const displayMinutes = document.querySelector("#displayMinutes");
const displaySeconds = document.querySelector("#displaySeconds");
const buttons = document.querySelectorAll("button");
// variables
let timer;
const millsMin = 1000 * 60;
const resetMins = 25;
let amountMins = resetMins;
let totalMills;
let pomoTime;

// functions
// always shows to digits
function alwaysTwoDigits(num) {
  return num < 10 ? "0" + num : num;
}
// updates amount milliseconds according to the amount of minutes chosenby user
function updateData() {
  totalMills = millsMin * amountMins;
  pomoTime = totalMills;
  updateDisplay();
}

// function to reset display to default status according to amountMins
function updateDisplay() {
  const min = Math.floor(pomoTime / millsMin);
  const sec = (pomoTime % millsMin) / 1000;
  displayMinutes.textContent = alwaysTwoDigits(min);
  displaySeconds.textContent = alwaysTwoDigits(sec);
}

//  function the interval will use
function timeDown() {
  if (pomoTime >= 1000) {
    pomoTime -= 1000;
    updateDisplay();
  } else {
    clearInterval(timer);
    pomoTime = totalMills;
    updateDisplay();
  }
}

// handleClick function
function handleClick(e) {
  const clickedBtn = e.target.id;
  if (clickedBtn === "start") {
    timer = setInterval(timeDown, 1000);
    document.querySelector("#start").setAttribute("disabled", true);
    document.querySelector("#up").setAttribute("disabled", true);
    document.querySelector("#down").setAttribute("disabled", true);
  }
  if (clickedBtn === "stop") {
    clearInterval(timer);
    document.querySelector("#start").removeAttribute("disabled");
  }
  if (clickedBtn === "reset") {
    clearInterval(timer);
    amountMins = resetMins;
    pomoTime = totalMills;
    updateData();
    updateDisplay();
    document.querySelector("#up").removeAttribute("disabled");
    document.querySelector("#down").removeAttribute("disabled");
    document.querySelector("#start").removeAttribute("disabled");
  }
  if (clickedBtn === "up") {
    if (amountMins === 59) {
      return;
    }
    amountMins++;
    updateDisplay();
    updateData();
  }
  if (clickedBtn === "down") {
    if (amountMins === 1) {
      return;
    }
    amountMins--;
    updateDisplay();
    updateData();
  }
}
buttons.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

// init
updateData();
