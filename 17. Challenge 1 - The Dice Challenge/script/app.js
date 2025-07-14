// Add an event listener to the button with class ".btn-roll"
// When the button is clicked, the function "diceGame" will be triggered.
document.querySelector(".btn-roll").addEventListener("click", diceGame);

// Function to animate the dice roll
function diceAnimation() {
  // Add the "dice-flip" CSS class to both player 1 and player 2 dice elements.
  // This class will trigger the animation (e.g., flipping effect).
  document.querySelector(".player-1-dice").classList.add("dice-flip");
  document.querySelector(".player-2-dice").classList.add("dice-flip");

  // Set a timeout to remove the animation class after 600 milliseconds (0.6 seconds)
  // This ensures that the dice only animate for a short period.
  setTimeout(function removeAnimation() {
    // Remove the "dice-flip" class to stop the animation after it runs.
    document.querySelector(".player-1-dice").classList.remove("dice-flip");
    document.querySelector(".player-2-dice").classList.remove("dice-flip");
  }, 600); // 600ms corresponds to the duration of the animation.
}

// Main game function that rolls the dice and updates the results
function diceGame() {
  // Generate a random number between 1 and 6 for player 1's dice
  let randomDice1 = Math.floor(Math.random() * 6 + 1);
  // Generate a random number between 1 and 6 for player 2's dice
  let randomDice2 = Math.floor(Math.random() * 6 + 1);

  // Call the diceAnimation function to add the flip animation
  diceAnimation();

  // Update the image source for player 1's dice to the corresponding image based on the random number
  // Example: if randomDice1 is 3, the image source will be "images/dice/dice3.webp"
  document.querySelector(".player-1-dice").setAttribute("src", "./assets/images/dice/dice" + randomDice1 + ".webp");

  // Update the image source for player 2's dice similarly
  document.querySelector(".player-2-dice").setAttribute("src", "./assets/images/dice/dice" + randomDice2 + ".webp");

  // Compare the two random numbers to determine the result of the game
  // If the two dice have the same value, it's a draw
  if (randomDice1 === randomDice2) {
    document.querySelector(".title").textContent = "Draw!";
  }
  // If player 1's dice is higher, player 1 wins
  else if (randomDice1 > randomDice2) {
    document.querySelector(".title").textContent = "Player 1 Win!";
  }
  // Otherwise, player 2 wins
  else {
    document.querySelector(".title").textContent = "Player 2 Win!";
  }
}

// -------------------------------------------------------------------------

// POPUP ELEMENT :

// Get Popup element
let popUpHow = document.querySelector("#popup-how");
let popUpAbout = document.querySelector("#popup-about");

// Get button to open Popup
let btnHow = document.querySelector("#open-how-to");
let btnAbout = document.querySelector("#open-about");

// Get the close button element
let closeBtnHow = document.querySelector(".closeBtnHow");
let closeBtnAbout = document.querySelector(".closeBtnAbout");

// When the user clicks the button, open the popup how to play
btnHow.onclick = function () {
  popUpHow.style.display = "block";
};

// When the user clicks the button, open the popup about
btnAbout.onclick = function () {
  popUpAbout.style.display = "block";
};

// When the user clicks on the close button (x), close the popup how to play
closeBtnHow.onclick = function () {
  popUpHow.style.display = "none";
};

// When the user clicks on the close button (x), close the popup about
closeBtnAbout.onclick = function () {
  popUpAbout.style.display = "none";
};

// When the user clicks anywhere outside of the popup how to play, close it
window.onclick = function (event) {
  if (event.target == popUpHow) {
    popUpHow.style.display = "none";
  }
};

// When the user clicks anywhere outside of the popup about, close it
window.onclick = function (event) {
  if (event.target == popUpAbout) {
    popUpAbout.style.display = "none";
  }
};
