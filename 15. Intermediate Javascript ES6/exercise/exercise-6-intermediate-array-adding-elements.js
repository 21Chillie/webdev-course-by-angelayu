// Step 1: Create an empty array
let myArray = [];

// Step 2: Add elements to the array
myArray.push(10); // Adds 10 to the end of the array
myArray.push(20); // Adds 20 to the end of the array
myArray.push(30); // Adds 30 to the end of the array
myArray.push(40); // Adds 40 to rhe end of the array

// Remove the last element
myArray.pop();

console.log(myArray); // Output will be [10, 20, 30]

// -------------------------------------------------------------

// Challenge :
// Create a function that add number inside array, everytime you call the function it will add next number inside array.
// If the number is divisible by 3, add Fizz inside array.
// If the number is divisible by 5, add Buzz inside array.
// If the number is divisible by 3 and 5, add FizzBuzz inside array.

// Solution :
let output = []; // Create an empty array to store results

function fizzBuzz() {
  // Get the next number by adding 1 to the length of the array
  let addNumber = output.length + 1;

  // If the number is divisible by both 3 and 5, add "FizzBuzz"
  if (addNumber % 3 === 0 && addNumber % 5 === 0) {
    output.push("FizzBuzz");
  }
  // If the number is divisible by 5, add "Buzz"
  else if (addNumber % 5 === 0) {
    output.push("Buzz");
  }
  // If the number is divisible by 3, add "Fizz"
  else if (addNumber % 3 === 0) {
    output.push("Fizz");
  }
  // If it's not divisible by 3 or 5, add the number itself
  else {
    output.push(addNumber);
  }

  // Print the updated array
  console.log(output);
}

// Run the fizzBuzz function once to add the next value to the array
fizzBuzz();