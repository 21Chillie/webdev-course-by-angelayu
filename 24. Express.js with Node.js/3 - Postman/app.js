import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/register", (req, res) => {
	res.send();
});

app.put("/user/angela", (req, res) => {
	res.sendStatus(200);
});

app.patch("/user/angela", (req, res) => {
	res.sendStatus(200);
});

app.delete("/user/angela", (req, res) => {
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
