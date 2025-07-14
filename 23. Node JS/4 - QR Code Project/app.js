import fs from "node:fs";
import inquirer from "inquirer";
import qr from "qr-image";

const question = [
	{
		type: "input",
		name: "text",
		message: "Type your url/text here: ",
	},
];

inquirer
	.prompt(question)
	.then((answer) => {
		const userAnswer = answer.text;

		fs.writeFile("./user.txt", userAnswer, "utf8", (err) => {
			{
				if (err) {
					throw err;
				} else {
          const qrValue = qr.image(userAnswer, { type: "png" });
					qrValue.pipe(fs.createWriteStream("user.png"));
					console.log(`File has been saved, with value ${userAnswer}`);
				}
			}
		});
	})
	.catch((error) => {
		if (error.isTtyError) {
			console.log("Prompt couldn't be rendered in the current environment");
		} else {
			console.log("Something else went wrong");
		}
	});
