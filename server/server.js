const express = require("express");
const uuid = require("uuid");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const users = [];
const tokens = {};

function getUser(username) {
  return users.find((nextUser) => nextUser.username === username);
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

app.post("/auth/sign-up", (req, res) => {
  const { username, password } = req.body;
  if (getUser(username)) {
    res.status(409).send({ msg: "Username already taken" });
  } else {
    users.push({ username, password });
    setAuthCookie(res, username);
    res.send({ username });
  }
});

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = getUser(username);
  if (user && user.password === password) {
    setAuthCookie(res, username);
    res.send({ username });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

app.post("/auth/logout", (req, res) => {
  const token = req.cookies["token"];
  delete tokens[token];
  res.clearCookie("token");
  res.send({});
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
