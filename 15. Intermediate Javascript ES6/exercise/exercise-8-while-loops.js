// Challenge :
// So for this challenge, make function beer print '99 bottles of beer' lyrics  to the console using While Loop.
// Lyric : https://www.99-bottles-of-beer.net/lyrics.html

// Solution :
function beer() {
  // Start with 99 bottles of beer
  let bottleOfBeer = 99;

  // Loop while there are bottles left (including when there are no bottles)
  while (bottleOfBeer >= 0) {
    // If there are no bottles left
    if (bottleOfBeer === 0) {
      // Print the message for running out of bottles
      console.log("No more bottles of beer on the wall, no more bottles of beer.");
      console.log("Go to the store and buy some more, 99 bottles of beer on the wall.");
    }
    // If there is exactly 1 bottle left
    else if (bottleOfBeer === 1) {
      // Print the message for the last bottle
      console.log("1 bottle of beer on the wall, 1 bottle of beer.");
      console.log("Take it down and pass it around, no more bottles of beer on the wall.");
    }
    // For all other cases (more than 1 bottle)
    else {
      // Print the message for more than 1 bottle
      console.log(bottleOfBeer + " bottles of beer on the wall, " + bottleOfBeer + " bottles of beer.");
      console.log("Take one down and pass it around, " + (bottleOfBeer - 1) + " bottles of beer on the wall.");
    }
    // Decrement the bottle count by 1 after printing
    bottleOfBeer--;
  }
}

// Run the beer function to see the output
beer();
