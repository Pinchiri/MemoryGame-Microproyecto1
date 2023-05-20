//Juego de Memoria
const cardsList = document.querySelectorAll(".card");
var score = document.getElementById("score");

let flipped = false;
let first, second;

let lock = true;
let scoreInt = 0;

let matchCounter = 0;

shuffle();

function flipCard() {
    
    if (lock) return;
    if (this === first) return;

    this.classList.add("flip");

    if (!flipped) {
        flipped = true;
        first = this;
        return;
    } 
    
    flipped = false;
    second = this;
    match();

}

function reset() {
    flipped = false;
    lock = false;

    first = null;
    second = null;
}

function match() {
    
    if (first.dataset.framework === second.dataset.framework) {

        first.removeEventListener("click", flipCard);
        second.removeEventListener("click", flipCard);

        if (matchCounter == 7) {
            console.log("HAS GANADO!");
            resetTimer();
        } else {
            matchCounter++;
            scoreInt = scoreInt + 100;
            score.textContent = scoreInt + " pts";
        }
        console.log(matchCounter);
        console.log("Match")
    } else {
        lock = true;
        setTimeout(() => {
            first.classList.remove("flip");
            second.classList.remove("flip");
            
            reset();
        }, 500);
    }
}

function shuffle() {
    cardsList.forEach(card => {
        let position = Math.floor(Math.random() * 17);
        card.style.order = position;
    });
}

function unlockBoard() {
    lock = false;
}

cardsList.forEach(card => card.addEventListener("click", flipCard));
//Juego de Memoria

//Timer
const play = document.getElementById("playButton");

play.addEventListener("click", startTimer);
play.addEventListener("click", unlockBoard);

var timerDisplay = document.getElementById("timer");
var totalTime = 180;

function startTimer() {
    play.disabled = true;
    var minutes, seconds;

    var timer = setInterval(function() {
    minutes = parseInt(totalTime / 60, 10);
    seconds = parseInt(totalTime % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = minutes + ":" + seconds;
    totalTime--;

    if (totalTime < 0) {
        clearInterval(timer);
        timerDisplay.textContent = "Tiempo finalizado";
        play.disabled = false;
      }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    totalTime = 180;
    timerDisplay.textContent = "03:00";
  }
//Timer

