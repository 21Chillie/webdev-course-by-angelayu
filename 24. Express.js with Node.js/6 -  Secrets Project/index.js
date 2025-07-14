import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

let passwordIsValid = false;

function checkPassword(req, res, next) {
	const correctPassword = "iloveprogramming";
	const userTypingPassword = req.body.password;

	if (userTypingPassword === correctPassword) {
		passwordIsValid = true;
	}

	next();
}

app.use(checkPassword);

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/public/index.html`);
});

app.post("/check", (req, res) => {
	if (passwordIsValid === true) {
		res.sendFile(`${__dirname}/public/secret.html`);
	} else if (passwordIsValid === false) {
		res.sendFile(`${__dirname}/public/index.html`);
    // or
    // res.redirect("/")
	}
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
