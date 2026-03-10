const express = require("express");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const router = express.Router();

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

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  if (getUser(username)) {
    res.status(409).send({ msg: "Username already taken" });
  } else {
    await createUser(username, password);
    setAuthCookie(res, username);
    res.send({ username });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = getUser(username);
  if (user && (await bcrypt.compare(password, user.password))) {
    setAuthCookie(res, username);
    res.send({ username });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

router.delete("/logout", (req, res) => {
  const token = req.cookies["token"];
  delete tokens[token];
  res.clearCookie("token");
  res.send({});
});

router.delete("/delete", (req, res) => {
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

router.get("/user", (req, res) => {
  const token = req.cookies["token"];
  const username = tokens[token];
  if (username) {
    res.send({ username });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

module.exports = router;
