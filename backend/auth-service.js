const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const {
  tokens,
  setSessionCookie,
  requireSession,
  requireLogin,
} = require("./session-state");

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

router.delete("/logout", requireLogin, (req, res) => {
  const token = req.cookies["token"];
  delete tokens[token];
  res.clearCookie("token");
  res.send({});
});

router.delete("/delete", requireLogin, (req, res) => {
  const token = req.cookies["token"];
  delete tokens[token];
  delete users[req.session.username];
  res.clearCookie("token");
  res.send({});
});

router.get("/user", requireSession, (req, res) => {
  res.send({ username: req.session.username, name: req.session.name });
});

module.exports = router;
