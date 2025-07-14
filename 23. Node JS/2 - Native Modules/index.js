const fs = require("node:fs");

fs.writeFile("message.txt", "Hello Node.js", (err) => {
	if (err) {
		throw err;
	} else {
		console.log("file has been saved");
	}
});

fs.readFile("./message.txt", "utf-8", (err, data) => {
	if (err) {
		throw err;
	} else {
		console.log(data);
	}
});
