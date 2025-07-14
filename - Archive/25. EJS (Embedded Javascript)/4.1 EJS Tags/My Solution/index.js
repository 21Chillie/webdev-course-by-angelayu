import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const data = {
    title: "EJS Tags",
    second: new Date().getSeconds(),
    items: ["Apple", "Banana", "Cherry"],
    htmlContent: "<em>This is some em text</em>",
  };

  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
