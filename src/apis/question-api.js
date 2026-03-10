export async function getQuestions() {
  const res = await fetch("/question");

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Could not get questions.");
  }

  return data.questions;
}
