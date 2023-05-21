//Juego de Memoria
const cardsList = document.querySelectorAll(".card");


let flipped = false;
let first, second;

let lock = true;


let matchCounter = 0;

let playerTime = 0;

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
            
            displayScore.textContent = "TOTAL SCORE: " + totalScore + " pts";
            matchCounter = 0;
            
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

function unflipAll() {
    cardsList.forEach(card=> {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });
    lock = false;

    
    
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

//Buttons
const play = document.getElementById("playButton");
const restart = document.getElementById("resetButton");

play.addEventListener("click", resetTimer);
play.addEventListener("click", startTimer);
play.addEventListener("click", reset);
play.addEventListener("click", shuffle);
play.addEventListener("click", resetScore);
play.addEventListener("click", unflipAll);

restart.addEventListener("click", resetTimer);
restart.addEventListener("click", startTimer);
restart.addEventListener("click", reset);
restart.addEventListener("click", shuffle);
restart.addEventListener("click", resetScore);
restart.addEventListener("click", unflipAll);

//Timer
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
    playerTime = 0;
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
var displayScore = document.getElementById("total");
let scoreInt = 0;
var totalScore = 0;
var score = document.getElementById("score");

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

function resetScore() {
    totalScore = 0;
    playerScore = 0;
    scoreInt = 0;
    score.textContent = "0 pts";
    displayScore.textContent = "TOTAL SCORE: 0 pts";
}

//User
var username = document.getElementById("username");