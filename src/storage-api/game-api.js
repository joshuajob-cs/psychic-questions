const STORAGE_URL = "http://localhost:3000";

export async function checkGame(gameCode) {
  const res = await fetch(`${STORAGE_URL}/game/${gameCode}`, {
    credentials: "include",
  });
  return res.ok;
}

export async function createGame() {
  const res = await fetch(`${STORAGE_URL}/game/create`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Could not create game.");
  }

  return data.gameCode;
}
