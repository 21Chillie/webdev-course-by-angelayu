# The Dice Game

![](https://media1.giphy.com/media/Qb3VOnPIFW7Vc0LnyH/giphy.gif)

## Overview

This is a solution to the Section 12: Boss Level Challenge 1 - The Dicee Game on [The Complete 2022 Web Development Bootcamp by Angela Yu](https://www.udemy.com/course/the-complete-web-development-bootcamp/). This challenges will help me improve my javascript coding skills by building projects.

### The challenge

Users should be able to:

- View the optimal layout for the content depending on their device's screen size.
- Roll both dice when button is clicked.
- Title will display who (player 1 or player 2) is the winner.

### My Solution

- Source Code: [Here](https://github.com/Chillie15/dice-game)
- Source Code (Javascript Vanilla): [Here](https://github.com/reskialamsyah/dice-game-js-vanilla)
- Live Site: [Here](https://reskialamsyah.github.io/dice-game/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Media Queries
- [Bootstrap 5](https://getbootstrap.com/) - For style and layout
- Bootstrap Grid System
- Javascript ES6

### What I learned

What I learnings while working through this project is:

- Javascript if/else statement:

```js
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
```

- Javascript Function:

```js
function functionName(parameters) {
  // code to be executed
}

functionName();
```

- JavaScript HTML DOM Selector and Manipulate HTML:

```js
// Manipulate Attribute
document.querySelector(".player-1-dice").setAttribute("src", "./assets/images/dice/dice" + randomDice1 + ".webp");
document.querySelector(".player-2-dice").setAttribute("src", "./assets/images/dice/dice" + randomDice2 + ".webp");

// Manipulate Text Content
document.querySelector(".title").textContent = "Draw!";
```

- JavaScript HTML DOM Remove/Add Class:

```js
document.querySelector(".player-1-dice").classList.remove("dice-flip");
document.querySelector(".player-2-dice").classList.remove("dice-flip");
```

- Javascript HTML DOM Adding eventListener to Button:

```js
document.querySelector(".btn-roll").addEventListener("click", diceGame);
```

## Got any feedback?

I would like to hearing your feedback or suggestion for this project! I'm always looking to improve my coding skill especially in web development. So if you have anything you'd like to mention about this project or just say hello, please email me at [reskialamsyah@gmail.com](mailto:reskialamsyah@gmail.com?subject=Feedback%20-%20The%20Dice%20Game%20Project).

## Socials

- LinkedIn - [Here](https://www.linkedin.com/in/resky-alamsyah-656652212/)
- Twitter - [@reskialamsyah\_](https://twitter.com/reskialamsyah_)
