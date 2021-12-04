// scritps.js

const cards = document.querySelectorAll(".memory-card");

var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;

var turn = true; // true = player1 false = player2

var player1Score = 0;
var player2Score = 0;

var player1 = "";
var player2 = "";

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    checkForMatch();
    updateTurn();
}

function checkForMatch() {
    var isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    updateScore();
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);


}

function updateScore() {

    if (turn) {
        player1Score++;
        document.getElementById("player1Score").innerHTML = player1Score + "&nbsp";
    } else {
        player2Score++;
        document.getElementById("player2Score").innerHTML = player2Score + "&nbsp";
    }
}

function updateTurn() {
    turn = !turn;
    if (turn) {
        document.getElementById("LBL_player1").style.color = "rgb(235, 194, 12)";
        document.getElementById("LBL_player2").style.color = "#fff";
    } else {
        document.getElementById("LBL_player2").style.color = "rgb(235, 194, 12)";
        document.getElementById("LBL_player1").style.color = "#fff";
    }

}

function getPlayers() {
    player1 += localStorage.getItem("player1");
    player2 += localStorage.getItem("player2");

    document.getElementById("LBL_player1").innerHTML = player1;

    document.getElementById("LBL_player2").innerHTML = player2;
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        var randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));