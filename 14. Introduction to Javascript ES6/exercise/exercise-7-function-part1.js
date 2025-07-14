// Declarate favoriteAnimal function.
// In a function declaration, the parameter is placed within the parentheses ().
// You can name this parameter anything you like, just as you would name a variable or function.
// Like example below, we name it with 'animal'.

// Example :
function favoriteAnimal(animal) {
  return animal + " is my favorite animal!";
}

console.log(favoriteAnimal("Goat"));

// ----------------------------------------------------

// Challenge
// Make Karel robot put beeper like chess board pattern (5x5)
// Result should be like this : https://imgur.com/a/LT6TsU7
// Karel Robot : https://stanford.edu/~cpiech/karel/ide.html

// Solution:
function main() {
  triBeeper();
  twoBeeper();
  triBeeper();
  twoBeeper();
  triBeeper();
}

function triBeeper() {
  putBeeper();
  move();
  move();
  putBeeper();
  move();
  move();
  putBeeper();
  turnLeft();
}

function twoBeeper() {
  move();
  turnLeft();
  move();
  putBeeper();
  move();
  move();
  putBeeper();
  move();
  turnRight();
  move();
  turnRight();
}
