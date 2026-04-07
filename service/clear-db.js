// Run with: npm run clear-db (from the service/ directory)

import { userCollection, gameCollection, client } from "./database.js";

await userCollection.deleteMany({});
console.log("Cleared users");

await gameCollection.deleteMany({});
console.log("Cleared games");

await client.close();
