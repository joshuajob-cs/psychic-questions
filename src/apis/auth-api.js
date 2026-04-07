async function serverFetch(url, options) {
  try {
    return await fetch(url, options);
  } catch {
    throw new Error("Cannot connect to server.");
  }
}

async function parseJSON(res) {
  try {
    return await res.json();
  } catch {
    throw new Error("Could not connect to server.");
  }
}

export async function signup(username, password) {
  const res = await serverFetch(`/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await parseJSON(res);

  if (!res.ok) {
    throw new Error(data.msg || "Something went wrong during sign-up.");
  }

  return data;
}

export async function login(username, password) {
  const res = await serverFetch(`/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await parseJSON(res);

  if (!res.ok) {
    throw new Error(data.msg || "Something went wrong during login.");
  }

  return data;
}

export async function logout() {
  const res = await serverFetch(`/auth/logout`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Could not log out :(");
  }
}

export async function deleteUser() {
  const res = await serverFetch(`/auth/delete`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Could not delete account :(");
  }
}

export async function getUser() {
  const res = await serverFetch(`/auth/user`, {
    credentials: "include",
  });

  const data = await parseJSON(res);

  if (!res.ok) {
    throw new Error(data.msg || "Could not get user :(");
  }

  return data;
}
