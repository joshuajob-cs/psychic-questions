export async function addAnswer(gameCode, playerName, answer) {
  const res = await fetch("/question/answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameCode, playerName, answer }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not add answer.");
  return data;
}

export async function getAnswers(gameCode, playerName) {
  const params = new URLSearchParams({ gameCode });
  if (playerName) params.append("playerName", playerName);

  const res = await fetch(`/question/answers?${params}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Could not get answers.");
  }

  return data;
}

export async function doneGuessing(gameCode, name) {
  const res = await fetch(`/question/done-guessing`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ gameCode, name }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not mark guessing done.");
  return data;
}

export async function getQuestions() {
  const res = await fetch("/question");

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Could not get questions.");
  }

  return data.questions;
}
