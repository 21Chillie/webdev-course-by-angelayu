import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(express.static("public"));

app.get("/", async (req, res) => {
	try {
		const result = await axios.get(`${API_URL}/random`);

		res.render("index.ejs", {
			secret: result.data.secret,
			user: result.data.username,
		});
	} catch (err) {
		res.status(404).send("Failed to fetch secrets");
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
