// This function generates the first 'n' numbers in the Fibonacci sequence.
function fibonacciGenerator(n) {
  // Step 1: Initialize an empty array 'output' to store the Fibonacci sequence.
  let output = [];

  // Step 2: Check if 'n' is 1 (if the user wants only the first Fibonacci number).
  if (n === 1) {
    // If 'n' is 1, the Fibonacci sequence is just [0].
    output = [0];
  }
  // Step 3: Check if 'n' is 2 (if the user wants the first two Fibonacci numbers).
  else if (n === 2) {
    // If 'n' is 2, the Fibonacci sequence is [0, 1].
    output = [0, 1];
  }
  // Step 4: For values of 'n' greater than 2, calculate the Fibonacci sequence.
  else {
    // Initialize the array with the first two Fibonacci numbers [0, 1].
    output = [0, 1];

    // Step 5: Use a for loop to generate the remaining Fibonacci numbers, starting from index 2 up to 'n'.
    for (let i = 2; i < n; i++) {
      // Each new number in the sequence is the sum of the previous two numbers.
      // output[output.length - 2] gives the second last element,
      // output[output.length - 1] gives the last element.
      output.push(output[output.length - 2] + output[output.length - 1]);
    }
  }

  // Step 6: Return the final Fibonacci sequence.
  return output;
}

// Call the fibonacciGenerator function with 'n' set to 5 and store the result in 'sequence'.
let sequence = fibonacciGenerator(5);

// Step 7: Print the Fibonacci sequence to the console.
console.log(sequence); // Output will be [0, 1, 1, 2, 3]
