const cards = document.querySelectorAll('.card');
let restart = document.getElementById('restart');
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let numOfMatch = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    console.log('It is first card');
    return;
  }

  //second click
  secondCard = this;
  console.log('It is second card');


  checkForMatch();
}

//Check for a match by accessing both cards dataset
function checkForMatch() {
  let isMatch = firstCard.dataset.transportation === secondCard.dataset.transportation;
  isMatch ? disableCards() : unflipCards();
}

//If cards are matched
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  console.log('it is a match');
  resetBoard();
  numOfMatch++;
  console.log(numOfMatch);
  if (numOfMatch === 6) {
    finishedGame();
  }
}

//If cards are not matched
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
  console.log('try again');
}

//Resetting the board after each round
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  console.log('reset board');
}

function finishedGame() {
  return alert("Congratulation! You've matched all the cards!");
}

//Shuffle the cards in random position
//by generate random numbers up to 12 and assign it to the flex-item order property
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

//Restart the game by refreshing/reload the page --> shuffle works
function resetGame() {
  setTimeout(function () {
    location.reload()
  }, 100);
}

restart.addEventListener('click', resetGame);

//Attach an EventListener
cards.forEach(card => card.addEventListener('click', flipCard));






