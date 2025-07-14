import e from "express";

const app = e();
const port = 3000;

app.get("/", (req, res) => {
  const todayDate = new Date();
  const day = todayDate.getDay();

  let typeDay = "a weekday";
  let typeAdvice = "work hard";

  if (day === 0 || day === 6) {
    typeDay = "the weekend";
    typeAdvice = "have fun";
  }

  res.render("index.ejs", {
    showTypeDay: typeDay,
    showTypeAdvice: typeAdvice,
  });
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
