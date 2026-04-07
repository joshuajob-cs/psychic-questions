export async function getPlayers(gameCode) {
  const res = await fetch(`/game/players?gameCode=${gameCode}`, {
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Could not get players.");
  return data.players;
}

export async function checkGame(gameCode) {
  const res = await fetch(`/game/${gameCode}`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Game not found.");
  }
}

export async function joinGame(gameCode, name) {
  const res = await fetch(`/game/join`, {
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
  const res = await fetch(`/game/points`, {
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
  const res = await fetch(`/game/winner?gameCode=${gameCode}`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Could not get winner.");
  }

  return data;
}


export async function advancePhase(gameCode, phase) {
  const res = await fetch(`/game/phase?phase=${phase}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ gameCode }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Could not advance phase.");
}

export async function createGame() {
  const res = await fetch(`/game/create`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Could not create game.");
  }

  return data.gameCode;
}
