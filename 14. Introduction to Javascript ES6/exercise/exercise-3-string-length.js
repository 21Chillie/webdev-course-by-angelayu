// Declare myMessage as variable, so whatever character you typing in prompt will be value of myMessage

let myMessage = prompt("Write your message here :");

// Declaring variable characterLeft for count remaining character you type (character limit is 140). So 140 - myMessage.length.
// myMessage.length is how many character you type. 

let characterLeft = 140 - myMessage.length;

alert("You have written " + myMessage.length + " characters, you have " + characterLeft + " characters left.");
