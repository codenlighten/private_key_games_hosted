require("dotenv").config();
const mongoUri = process.env.MONGO_URI;
const { MongoClient } = require("mongodb");
let db;
//connect to mongoDB

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db("address_games");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
// connectDB();

const addAttempt = async (attempt) => {
  try {
    const collection = db.collection("attempts");
    await collection.insertOne(attempt);
  } catch (error) {
    console.log("Error adding attempt", error);
  }
};

const getAttempts = async () => {
  try {
    const collection = db.collection("attempts");
    const attempts = await collection.find().toArray();
    return attempts;
  } catch (error) {
    console.log("Error getting attempts", error);
  }
};
module.exports = { addAttempt, getAttempts, connectDB };
