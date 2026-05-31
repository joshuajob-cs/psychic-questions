export async function getRandomPoem() {
  const res = await fetch("https://poetrydb.org/random");

  if (!res.ok) {
    throw new Error("Could not fetch poem.");
  }

  const data = await res.json();
  return data[0];
}
