import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

function countNameLetter(req, res, next) {
	const fName = req.body.fName;
	const lName = req.body.lName;

	req.nameLetterCount = fName.length + lName.length;
	next();
}

app.get("/", (req, res) => {
	res.render("index.ejs", { namecount: null });
});

app.post("/submit", countNameLetter, (req, res) => {
	const nameCount = req.nameLetterCount;
	res.render("index.ejs", { nameCount });
});

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
