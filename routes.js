const express = require("express");
const app = express();
const PORT = 3000;
const dotenv = require("dotenv");
dotenv.config();

// Parse incoming request bodies in a middleware before your handlers
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define the /keywords endpoint
app.get("/keywords", (req, res) => {
  console.log("Keyword request received from client with key:", req.query.key);

  const wordsList = require("./top1000words.json");
  const randomIndex = Math.floor(Math.random() * wordsList.length);
  const keyword = wordsList[randomIndex];
  console.log("Keyword sent to client:", keyword);
  res.send(keyword);
});

// Define the POST endpoint
app.post("/get-secret", (req, res) => {
  console.log("SecretKey request received from client", req.body);
  /*   const key = "GDZ9EGX1wVvELJrAviRVoj9VN1dNXmJYbb4qipczkuJC";
   */
  const expectedValue = 1900000000;
  const stakingKey = Object.keys(req.body)[0];

  if (req.body[stakingKey] >= expectedValue) {
    console.log("looks good");
    res.json({ secretKey: process.env.SECRET_KEY });
  } else {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // This is important if you want to import the server in another file.
