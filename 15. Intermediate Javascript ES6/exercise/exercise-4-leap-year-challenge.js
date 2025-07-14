function leapYear(year) {
  // First, check if the year is NOT divisible by 4.
  // If so, it's NOT a leap year.
  if (year % 4 !== 0) {
    alert("Not leap year.");
  }
  // If the year is divisible by 4, check if it's NOT divisible by 100.
  // If it's divisible by 4 but NOT by 100, it's a leap year.
  else if (year % 100 !== 0) {
    alert("Leap year.");
  }
  // If the year is divisible by 100, check if it's also divisible by 400.
  // If so, it's a leap year.
  else if (year % 400 === 0) {
    alert("Leap year.");
  }
  // Otherwise, it's NOT a leap year.
  else {
    alert("Not leap year.");
  }
}

// Prompt the user to enter a year and store it in the variable 'inputYear'.
const inputYear = prompt("What year?");

// Call the leapYear function and pass 'inputYear' as the argument.
leapYear(inputYear);
