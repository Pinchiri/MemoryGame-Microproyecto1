//Juego de Memoria
const cardsList = document.querySelectorAll(".card");


let flipped = false;
let first, second;

let lock = true;


let matchCounter = 0;

let playerTime = 0;

var displayScore = document.getElementById("total");
let scoreInt = 0;
var totalScore = 0;
var score = document.getElementById("score");

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
            updateScore();
            console.log("HAS GANADO!");
            stopTimer();

            totalScore = calculateTotalScore();
            console.log(totalScore);
            
            displayScore.textContent = "TOTAL SCORE: " + totalScore + " pts"
            
        } else {
            matchCounter++;
            updateScore();
        }
        
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

function restartGame() {
    
}
cardsList.forEach(card => card.addEventListener("click", flipCard));
//Juego de Memoria

//Timer
const play = document.getElementById("playButton");

play.addEventListener("click", startTimer);
play.addEventListener("click", reset);

var timerDisplay = document.getElementById("timer");
var totalTime = 180;
var timer;

function startTimer() {
    play.disabled = true;
    var minutes, seconds;

    timer = setInterval(function() {
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

function stopTimer() {
    clearInterval(timer);
    console.log("Total Time: " + totalTime);
    playerTime = totalTime;
    play.disabled = false;
    minutes = parseInt(totalTime / 60, 10);
    seconds = parseInt(totalTime % 60, 10);

    timerDisplay.textContent = minutes + ":" + seconds;
  } 
//Timer

//Score


function updateScore() {
    scoreInt = scoreInt + 100;
    score.textContent = scoreInt + " pts";
}

function calculateTotalScore() {
    console.log("P" + playerTime);
    console.log(scoreInt);
    totalScore = Math.floor(scoreInt * (playerTime / 180));
    return totalScore;
}
