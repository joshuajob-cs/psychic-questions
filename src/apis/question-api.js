export async function addAnswer(gameCode, playerName, answer) {
  const res = await fetch("/question/answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameCode, playerName, answer }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Could not add answer.");
  }

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
