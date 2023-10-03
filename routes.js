const express = require("express");
const app = express();
const PORT = 3000;
const keywords = require("./keywords");

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define the /keywords endpoint
app.get("/keywords", (req, res) => {
  const wordsList = require("./top1000words.json");
  const randomIndex = Math.floor(Math.random() * wordsList.length);

  res.send(wordsList[randomIndex]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // This is important if you want to import the server in another file.
