const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const restartBtn = document.getElementById("restart");

let moves = 0;
let flippedCards = [];
let matchedPairs = 0;
const maxMoves = 20;

const emojis = ["🍎","🍌","🍇","🍉","🍓","🥝","🍒","🍑"];
let cardValues = [...emojis, ...emojis];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  board.innerHTML = "";
  cardValues = shuffle(cardValues);
  cardValues.forEach(value => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;

    const front = document.createElement("div");
    front.classList.add("front");
    front.textContent = "?";

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = value;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });

  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  movesDisplay.textContent = `Moves: ${moves} / ${maxMoves}`;
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped") && moves < maxMoves) {
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      movesDisplay.textContent = `Moves: ${moves} / ${maxMoves}`;
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === emojis.length) {
      setTimeout(() => {
        movesDisplay.textContent = `You won in ${moves} moves! 🎉`;
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 700);
  }

  if (moves >= maxMoves && matchedPairs < emojis.length) {
    setTimeout(() => {
      alert("Game Over! You reached the maximum moves.");
      createBoard();
    }, 500);
  }
}

restartBtn.addEventListener("click", createBoard);

createBoard();
