const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

async function storeData(taskId, round, data) {
  await client.connect();
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  await collection.insertOne({taskId, round, data});
  await client.close();
}

module.exports = storeData;