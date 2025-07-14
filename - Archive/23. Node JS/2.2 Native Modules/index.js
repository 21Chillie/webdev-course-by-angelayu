const fs = require("fs");

fs.writeFile("Message.txt", "Hello from NodeJS!", function (err) {
  if (err) throw err;
  console.log("The file have been saved.");
});

fs.readFile("./Message.txt", "utf8", function (err, data) {
  if (err) throw err;
  console.log(data);
});
