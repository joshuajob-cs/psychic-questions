import { MongoClient } from "mongodb";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${encodeURIComponent(config.password)}@${config.hostname}`;

const client = new MongoClient(url);
const dbName = process.env.NODE_ENV === "test" ? "psychic-questions-test" : "psychic-questions";
const db = client.db(dbName);

const userCollection = db.collection("users");
const gameCollection = db.collection("games");
const questionCollection = db.collection("questions");

export { userCollection, gameCollection, questionCollection, client };

async function main() {
  try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);
  } catch (ex) {
    console.log(`Error with ${url} because ${ex.message}`);
    process.exit(1);
  }
}

main();
