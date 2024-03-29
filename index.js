require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const { generateKeys } = require("./keys");
const { addAttempt, getAttempts, connectDB } = require("./mongo");
const cors = require("cors");

app.use(cors());
// cors for addressgame.com
app.use(cors({ origin: "https://addressgame.com" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
let attempts = [];
let totalAttempts = 0;
//get attempts
const getAttemptsMongo = async () => {
  attempts = await getAttempts();
  totalAttempts = attempts.length;
};

// index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/attempt", async (req, res) => {
  try {
    const { address, guess } = req.body;
    const attempt = { address, guess };
    await addAttempt(attempt);
    attempts.push(attempt);
    totalAttempts++;
    res.json({ message: "Attempt added" });
  } catch (error) {
    console.error(`Failed to add attempt: ${error}`);
    res.status(500).json({ message: "Failed to add attempt" });
  }
});

app.get("/api/attempts", async (req, res) => {
  try {
    if (attempts.length === 0) {
      await getAttemptsMongo();
    }
    const number = attempts.length || 0;
    res.json({ number, attempts });
  } catch (error) {
    console.error(`Failed to get attempts: ${error}`);
    res.status(500).json({ message: "Failed to get attempts" });
  }
});

const port = process.env.PORT || 3000;

// Modified to ensure MongoDB connection before starting the server
const startServer = async () => {
  try {
    await connectDB();
    console.log(`Connected to MongoDB`);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error}`);
    process.exit(1); // Exit process with failure
  }
};

startServer();
