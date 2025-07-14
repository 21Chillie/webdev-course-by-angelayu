let nameAnimal = prompt("Can you name one animal? ");

// The character you type in nameAnimal prompt will be Upper Case.
// Example "MONKEY" without have to type all upper case in prompt.

nameAnimal = nameAnimal.toUpperCase();

alert(nameAnimal);

// You can change the value to lower case if you want by using "toLowerCase()"

// -------------------------------------------

// Challenge
// 1. Make a prompt that asking your name but first character must be upper case and the rest will be lower case.
// 2. The user can type whatever in the prompt lower case or upper case so long the rule #1 still applied.

// Solution:
let myName = prompt("What is your name? ");

// So, the first character (0) will be upper case and the rest will be trim.
let firstCharacter = myName.slice(0, 1).toUpperCase();

// Start from second character (1) and the rest will be lower case.
let otherCharacter = myName.slice(1).toLowerCase();

// The value of userName variable will be firstCharacter and otherCharacter combine.
let userName = firstCharacter + otherCharacter;

alert("Hello, " + userName);
