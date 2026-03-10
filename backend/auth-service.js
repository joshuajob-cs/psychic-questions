const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { tokens, setSessionCookie } = require("./session-state");

const users = {};

function getUser(username) {
  return users[username];
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  users[username] = { password: passwordHash };
}

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  if (getUser(username)) {
    res.status(409).send({ msg: "Username already taken" });
  } else {
    await createUser(username, password);
    setSessionCookie(res, { username });
    res.send({ username });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = getUser(username);
  if (user && (await bcrypt.compare(password, user.password))) {
    setSessionCookie(res, { username });
    res.send({ username });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

router.put("/name", (req, res) => {
  const token = req.cookies["token"];
  const session = tokens[token];
  if (!session) {
    res.status(401).send({ msg: "Unauthorized" });
  } else {
    session.name = req.body.name;
    res.send({});
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
  const session = tokens[token];
  if (session) {
    delete tokens[token];
    delete users[session.username];
    res.clearCookie("token");
    res.send({});
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

router.get("/user", (req, res) => {
  const token = req.cookies["token"];
  const session = tokens[token];
  if (session) {
    res.send({ username: session.username, name: session.name });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

module.exports = router;
