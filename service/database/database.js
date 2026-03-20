import { MongoClient } from "mongodb";
import config from "./dbConfig.json" assert { type: "json" };

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db("psychic-questions");

const userCollection = db.collection("users");
const gameCollection = db.collection("games");
const questionCollection = db.collection("questions");

export { userCollection, gameCollection, questionCollection };

async function main() {
  try {
    // add all the following database code here
  } finally {
    client.close();
  }
}

main();
