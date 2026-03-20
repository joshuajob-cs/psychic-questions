import { MongoClient } from "mongodb";
import config from "./dbConfig.json" assert { type: "json" };

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db("rental");
const collection = db.collection("house");

async function main() {
  try {
    // add all the following database code here
  } finally {
    client.close();
  }
}

main();
