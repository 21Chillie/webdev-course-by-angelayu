// Declare myMessage as variable, so whatever character you typing in prompt will be value of myMessage.
let myMessage = prompt("Write your message here :");

// messageLimit is for limit your message to 140 characters.
// The 'slice' property will trim your text to show only the first 140 characters. Any characters beyond that will not be displayed.
messageLimit = myMessage.slice(0, 140);

// Declaring variable characterLeft for count remaining character you type (character limit is 140).
// myMessage.length is how many character you type.
let characterLeft = 140 - messageLimit.length;

alert("Your message: " + messageLimit);
alert("You have written " + messageLimit.length + " characters, you have " + characterLeft + " characters left.");

// Note :
// The Program will always count from 0.
