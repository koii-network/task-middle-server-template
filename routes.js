const express = require("express");
const app = express();


// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define the /keywords endpoint
app.get("/keywords", (req, res) => {
  res.json(["koii", "web3", "al_koii"]);
});

module.exports = app;
