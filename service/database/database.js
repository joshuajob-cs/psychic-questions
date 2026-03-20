import { MongoClient } from "mongodb";
import config from "./dbConfig.json" assert { type: "json" };

const url = `mongodb+srv://${config.userName}:${encodeURIComponent(config.password)}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db("psychic-questions");

const userCollection = db.collection("users");
const gameCollection = db.collection("games");
const questionCollection = db.collection("questions");

export { userCollection, gameCollection, questionCollection };

async function main() {
  try {
    try {
      await db.command({ ping: 1 });
      console.log(`DB connected to ${config.hostname}`);
    } catch (ex) {
      console.log(`Error with ${url} because ${ex.message}`);
      process.exit(1);
    }
  } finally {
    client.close();
  }
}

main();
