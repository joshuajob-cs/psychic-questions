const STORAGE_URL = "http://localhost:3000";

export async function signup(username, password) {
  const res = await fetch(`${STORAGE_URL}/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Could not sign up :(");
  }

  return data;
}
