require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const { generateKeys } = require("./keys");
const { addAttempt, getAttempts, connectDB } = require("./mongo");
const cors = require("cors");
app.use(cors());
// cors addressgame.com
app.use(cors({ origin: "https://addressgame.com" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
let attempts = [];
//get attempts
const getAttemptsMongo = async () => {
  attempts = await getAttempts();
};

// index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/attempt", async (req, res) => {
  const { address, guess } = req.body;
  const attempt = {
    address,
    guess,
  };
  await addAttempt(attempt);
  attempts.push(attempt);
  res.json({ message: "Attempt added" });
});

app.get("/api/attempts", async (req, res) => {
  if (attempts.length === 0) {
    await getAttemptsMongo();
  }
  const number = attempts.length || 0;
  res.json({ number, attempts });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
