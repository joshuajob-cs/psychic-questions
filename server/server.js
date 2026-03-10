const express = require("express");
const uuid = require("uuid");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const users = {};
const tokens = {};

function getUser(username) {
  return users[username];
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  users[username] = { username, password: passwordHash };
}

function setAuthCookie(res, username) {
  const token = uuid.v4();
  tokens[token] = username;
  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

app.post("/auth/sign-up", async (req, res) => {
  const { username, password } = req.body;
  if (getUser(username)) {
    res.status(409).send({ msg: "Username already taken" });
  } else {
    await createUser(username, password);
    setAuthCookie(res, username);
    res.send({ username });
  }
});

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = getUser(username);
  if (user && (await bcrypt.compare(password, user.password))) {
    setAuthCookie(res, username);
    res.send({ username });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

app.delete("/auth/logout", (req, res) => {
  const token = req.cookies["token"];
  delete tokens[token];
  res.clearCookie("token");
  res.send({});
});

app.delete("/auth/delete", (req, res) => {
  const token = req.cookies["token"];
  const username = tokens[token];
  if (username) {
    delete tokens[token];
    delete users[username];
    res.clearCookie("token");
    res.send({});
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

app.get("/auth/user", (req, res) => {
  const token = req.cookies["token"];
  const username = tokens[token];
  if (username) {
    res.send({ username });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
