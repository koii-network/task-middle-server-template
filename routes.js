const express = require("express");
const app = express();

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

module.exports = app;
