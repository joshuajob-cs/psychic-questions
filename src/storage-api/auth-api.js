export async function signup(username, password) {
  const res = await fetch(`/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Something went wrong during sign-up.");
  }

  return data;
}

export async function login(username, password) {
  const res = await fetch(`/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Something went wrong during login.");
  }

  return data;
}

export async function logout() {
  const res = await fetch(`/auth/logout`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Could not log out :(");
  }
}

export async function deleteUser() {
  const res = await fetch(`/auth/delete`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Could not delete account :(");
  }
}

export async function getUser() {
  const res = await fetch(`/auth/user`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Could not get user :(");
  }

  return data;
}
