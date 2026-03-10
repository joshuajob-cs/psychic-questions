export async function getRandomFact() {
  const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");

  if (!res.ok) {
    throw new Error("Could not fetch useless fact.");
  }

  const data = await res.json();
  return data.text;
}
