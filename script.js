"use strict"

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El  = document.getElementById("score--1");  
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold"); 

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0
let activePlayer = 0;
let playing = true; //state variable

// Init Function understand

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

//Rolling Dice Functionality
btnRoll.addEventListener("click", function(){
  if(playing) {
  //1.Generating random dice roll
 const dice = Math.trunc(Math.random() * 6) +1 ;
 console.log(dice);

  //2. Display Dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`; 
  //3. Checkrolled 1 : if true switch to next player
  if(dice !== 1) {
    //Add dice value to current score. As we need to save the dice score
    //we will need to save the dice value.
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
}
})

btnHold.addEventListener("click", function(){
  if(playing) {
  //1. Add current score to active player's score
  scores[activePlayer] += currentScore; 
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  //2. Check if player's score >= 100
  if(scores[activePlayer] >= 20) {
    playing = false;
    diceEl.classList.add("hidden");
    document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
  } else {
  //Finish Game
  //Switch to next player
  switchPlayer();
} 
}
})

btnNew.addEventListener("click", function(){
  diceEl.classList.add("hidden");
  document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
  document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
  activePlayer = 0;
  document.querySelector(`.player--${activePlayer}`).classList.add("player--active");

  
  // player0El.classList.toggle("player--active");
  // player1El.classList.toggle("player--active");
  
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  scores[0] = currentScore;
  scores[1] = currentScore;
  //currentScore to be set to zero
  current0El.textContent = 0;
  current1El.textContent = 0;
  
  //set active player to 0;
    
  playing = true;
})