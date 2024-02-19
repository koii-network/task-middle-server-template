const express = require("express");
const app = express();
const PORT = 3000;
const dotenv = require("dotenv");
const cors = require("cors");
const { decrypt } = require("solana-encryption");
const fs = require("fs");
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

dotenv.config();

// Parse incoming request bodies in a middleware before your handlers
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define the /walletAddressList endpoint
app.get("/walletAddressList", (req, res) => {
  console.log("Keyword request received from client with key:", req.query.key);
  const walletAddressList = "AtAFdtjURSCUGVSD2kRLsjLSXvBxCEnynndC5DbyKfKW";
  console.log("Keyword sent to client:", walletAddressList);
  res.send(walletAddressList);
});

// Define the POST endpoint
app.post("/verification", (req, res) => {
  const pathToJson = './id_test.json'
  const privateKeyData = fs.readFileSync(pathToJson, 'utf8');
  const privateKey = JSON.parse(privateKeyData);

  console.log(req.body);

  const encryptedData = nacl.util.decodeBase64(req.body.data);
  const nonce = nacl.util.decodeBase64(req.body.nonce);

  const decrypted = decrypt(encryptedData, nonce, req.body.key, privateKey);
  console.log("Decrypted data:", JSON.parse(decrypted));
  console.log("verification:", JSON.parse(decrypted).verify);
  res.send(decrypted);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // This is important if you want to import the server in another file.
