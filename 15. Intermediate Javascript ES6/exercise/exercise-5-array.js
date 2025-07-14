// Example:
// Create an array called guestList with six elements (names of guests)
const guestList = ["Angela", "Jack", "Pam", "James", "Lara", "Jason"];

// Use the length property to find out how many elements are in the guestList array
console.log(guestList.length); // 6
// Explanation: The length of the array is 6 because there are 6 names in the array.

// Check if the string "Real" is present in the guestList array using the includes() method
console.log(guestList.includes("Real")); // false
// Explanation: The includes() method checks if the value "Real" exists in the array.
// Since "Real" is not in the guestList, the result is false.

// ------------------------------------
// Challenge
// Make prompt that asking guest name.
// If guest name does exist in guest list, will send an alert that say "Welcome, [Guest Name]".
// If not, send an alert "Sorry, [Guest Name] maybe next time".
// Your guest list will be the one in example, "guestList" variable with 6 names of guest.

// Solution :
let inputName = prompt("What is your name sir?");

let firstLetter = inputName.slice(0, 1).toLocaleUpperCase();
let remainingLetter = inputName.slice(1).toLowerCase();

const guestName = firstLetter + remainingLetter;

if (guestList.includes(guestName) === true) {
  alert("Welcome, " + guestName + ".");
} else {
  alert("Sorry, " + guestName + " maybe next time.");
}
