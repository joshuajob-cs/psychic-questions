import { gameCollection } from "./database.js";
import { games, Game } from "./game-state.js";

async function saveGame(game) {
  const { _saveTimer, ...data } = game;
  await gameCollection.replaceOne({ gameCode: game.gameCode }, data, {
    upsert: true,
  });
}

async function loadGame(gameCode) {
  const data = await gameCollection.findOne({ gameCode });
  if (!data) return null;
  const game = Game.fromMongo(data);
  games[gameCode] = game;
  return game;
}

async function deleteGame(gameCode) {
  await gameCollection.deleteOne({ gameCode });
}

async function getGame(gameCode) {
  return games[gameCode] ?? (await loadGame(gameCode));
}

export { saveGame, loadGame, deleteGame, getGame };
