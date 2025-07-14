/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

// Importing required modules

import inquirer from "inquirer"; // Module to handle CLI prompts
import qr from "qr-image"; // Module to generate QR code images
import { writeFile } from "node:fs"; // Function to write text data to files
import { createWriteStream } from "fs"; // Function to create write streams for files

// Prompting the user for input using `inquirer`
inquirer
  .prompt([
    {
      type: "input", // Type of prompt (text input)
      name: "url", // Variable to store the user's URL input
      message: "Type your URL (www.example.com) or text here: ", // Prompt message shown to the user
    },
    {
      type: "input", // Type of prompt (text input)
      name: "fileName", // Variable to store the user's desired file name
      message: "Type your file name: ", // Prompt message for file name
    },
  ])
  .then((answers) => {
    // Handling user responses

    // Step 1: Save the URL text to a file
    // Convert the URL (answers.url) to a binary format using `Buffer.from`
    const data = new Uint8Array(Buffer.from(answers.url));

    // Write the URL data to a .txt file with the provided filename
    writeFile(answers.fileName + ".txt", data, (err) => {
      if (err) throw err; // Throw error if write operation fails
      console.log("Your URL is : ", answers.url); // Log the provided URL
      console.log("Your file name is: " + answers.fileName + ".txt"); // Log the file name
      console.log("The file has been saved"); // Confirm file save success
    });

    // Step 2: Generate a QR code for the URL and save it as an image file
    const qr_img = qr.image(answers.url, { type: "png" }); // Generate a PNG QR image
    qr_img.pipe(createWriteStream("qr-" + answers.fileName + ".png")); // Write QR image to a file with "qr-" prefix

    console.log("QR Image has been saved"); // Confirm QR image save success
  })
  .catch((error) => {
    // Error handling for prompt or file operations
    if (error.isTtyError) {
      // Error if the prompt can't render in the current environment
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong", error); // Catch-all for other errors
    }
  });
