const STORAGE_URL = "http://localhost:3000";

export async function checkGame(gameCode) {
  const res = await fetch(`${STORAGE_URL}/game/${gameCode}`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Game not found.");
  }
}

export async function joinGame(gameCode, name) {
  const res = await fetch(`${STORAGE_URL}/game/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ gameCode, name }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Could not join game.");
  }

  return data;
}

export async function addPoints(gameCode, name, delta) {
  const res = await fetch(`${STORAGE_URL}/game/points`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ gameCode, name, delta }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Could not update points.");
  }

  return data;
}

export async function getWinner(gameCode) {
  const res = await fetch(`${STORAGE_URL}/game/winner?gameCode=${gameCode}`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Could not get winner.");
  }

  return data;
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
