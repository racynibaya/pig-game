'use strict';

// Score
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

// Current score
const currentScore0El = document.getElementById('current--0');

const currentScore1El = document.getElementById('current--1');

// btns
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initial state
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const winningScore = 10;
let currentScore = 0;
let activePlayer = 0;

let scores = [0, 0];

// Roll dice

btnRoll.addEventListener('click', function () {
  // generate random number 1 - 6
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }
});

btnHold.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  console.log(scores);
  if (scores[activePlayer] >= winningScore) {
    document.querySelector(`.player--${activePlayer}`).classList.add('winner');
    btnRoll.disabled = true;
    btnHold.disabled = true;
  } else {
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }
});

btnNew.addEventListener('click', function () {
  // reset scores
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;

  document.querySelector('.player--1').classList.remove('player--active');

  document.querySelector('.player--0').classList.add('player--active');

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  btnRoll.disabled = false;
  btnHold.disabled = false;

  document.querySelector(`.player--0`).classList.remove('winner');
  document.querySelector(`.player--1`).classList.remove('winner');
});
