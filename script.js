const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let shuffledCharacters = [...characters, ...characters].sort(() => Math.random() - 0.5);
let flippedCards = [];
let matchedPairs = 0;
let locked = false; // To prevent clicking during animations
let attempts = 0;

const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const attemptCount = document.getElementById('attemptCount');

resetButton.addEventListener('click', resetGame);

function createCard(character) {
  const card = document.createElement('div');
  card.className = 'card';
  
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';
  
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  cardFront.textContent = '';
  
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  cardBack.textContent = character;
  
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  
  card.appendChild(cardInner);
  
  card.addEventListener('click', () => flipCard(card));
  
  return card;
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped') && !locked) {
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      attempts++;
      locked = true;
      setTimeout(checkForMatch, 1000);
    }
  }
}

function checkForMatch() {
  locked = false;
  if (flippedCards[0].textContent === flippedCards[1].textContent) {
    matchedPairs++;
    flippedCards[0].removeEventListener('click', flipCard);
    flippedCards[1].removeEventListener('click', flipCard);
    flippedCards = [];
    if (matchedPairs === characters.length) {
      alert(`Congratulations! You won the game in ${attempts} attempts!`);
    }
  } else {
    flippedCards.forEach(card => card.classList.remove('flipped'));
    flippedCards = [];
  }
  
  updateAttempts();
}

function resetGame() {
  gameBoard.innerHTML = '';
  shuffledCharacters = [...characters, ...characters].sort(() => Math.random() - 0.5);
  flippedCards = [];
  matchedPairs = 0;
  attempts = 0;
  updateAttempts();
  initializeBoard();
}

function updateAttempts() {
  attemptCount.textContent = attempts;
}

function initializeBoard() {
  shuffledCharacters.forEach(character => {
    const card = createCard(character);
    gameBoard.appendChild(card);
  });
}

initializeBoard();

