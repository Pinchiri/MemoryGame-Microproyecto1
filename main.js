const cardsList = document.querySelectorAll(".card");

let flipped = false;
let first, second;

let lock = false;
let score = 0;

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
        console.log("Match")
    } else {
        lock = true;
        setTimeout(() => {
            first.classList.remove("flip");
            second.classList.remove("flip");
            
            reset();
        }, 1500);
    }
}

function shuffle() {
    cardsList.forEach(card => {
        let position = Math.floor(Math.random() * 17);
        card.style.order = position;
    });
}


cardsList.forEach(card => card.addEventListener("click", flipCard));
