import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.

app.get("/", async (req, res) => {
	try {
		const response = await axios.get("https://bored-api.appbrewery.com/random");
		const result = response.data;

		console.log(result);

		res.render("index.ejs", { data: result });
	} catch (err) {
		console.log("Failed to make a request:", err.message);

		res.render("index.ejs", { data: null, error: err.message });
	}
});

app.post("/", async (req, res) => {
	const typeActivity = req.body.type;
	const participantNumber = req.body.participants;
	let url = "https://bored-api.appbrewery.com";

	if (typeActivity && participantNumber) {
		url += `/filter?type=${typeActivity}&participants=${participantNumber}`;
	} else if (typeActivity) {
		url += `/filter?type=${typeActivity}`;
	} else if (participantNumber) {
		url += `/filter?participants=${participantNumber}`;
	} else if (!typeActivity && !participantNumber) {
		url += `/random`;
	}

	try {
		const response = await axios.get(url);
		const listResult = response.data;
		const randomIndex = Math.floor(Math.random() * listResult.length);
		let result;

		if (listResult.length > 1) {
			result = listResult[randomIndex];
		} else {
			result = listResult;
		}

		console.log(result);
		res.render("index.ejs", { data: result });
	} catch (err) {
		console.log("Failed to make a request:", err.message);

		res.render("index.ejs", { data: null, error: err.message });
	}
});

app.listen(port, () => {
	console.log(`Server listening on port http://localhost:${port}/`);
});
