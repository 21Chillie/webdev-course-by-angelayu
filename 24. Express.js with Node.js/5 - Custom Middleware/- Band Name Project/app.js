import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const filePath = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

let bandName = "";

function bandNameGenerator(req, res, next) {
	console.log(req.body);
	bandName = `${req.body.street} ${req.body.pet}`;
	next();
}

app.use(bandNameGenerator);

app.get("/", (req, res) => {
	res.sendFile(`${filePath}/public/index.html`);
});

app.post("/submit", (req, res) => {
	const resultMessage = `
  <h1>Your band name is</h1>
  <h2>${bandName}</h2>
  `;

	res.send(resultMessage);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
