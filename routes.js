const express = require("express");
const app = express();
const PORT = 3000;
const keywords = require("./keywords");

app.get("/keywords", (req, res) => {
  res.json(keywords);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // This is important if you want to import the server in another file.
