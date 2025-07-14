import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("tiny"));

app.listen(port, () => {
  console.log(`Server listen on ${port}.`);
});

app.get("/", (req, res) => {
  res.send("Hello");
});
