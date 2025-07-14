// A list of names (people who might buy lunch)

// Function to randomly pick who is buying lunch
function whosBuyingLunch(names) {
  // Choose a random index from the names array using Math.random()
  // Math.floor rounds down the number, and Math.random() gives a random decimal between 0 and 1
  let who = names[Math.floor(Math.random() * names.length)];

  // Return a message saying who will buy lunch
  return who + " is going to buy lunch today!";
}

// Print the result of the function (who is buying lunch) to the console
console.log(whosBuyingLunch(names));
