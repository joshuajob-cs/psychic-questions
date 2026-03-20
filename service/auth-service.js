import express from "express";
import bcrypt from "bcryptjs";
import { tokens, setSessionCookie, requireSession, requireLogin } from "./session-state.js";
import { userCollection } from "./database/database.js";

const router = express.Router();

async function getUser(username) {
  return userCollection.findOne({ username });
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  await userCollection.insertOne({ username, password: passwordHash });
}

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  if (await getUser(username)) {
    res.status(409).send({ msg: "Username already taken" });
  } else {
    await createUser(username, password);
    setSessionCookie(res, { username });
    res.send({ username });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);
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

router.delete("/delete", requireLogin, async (req, res) => {
  const token = req.cookies["token"];
  delete tokens[token];
  await userCollection.deleteOne({ username: req.session.username });
  res.clearCookie("token");
  res.send({});
});

router.get("/user", requireSession, (req, res) => {
  res.send({ username: req.session.username, name: req.session.name });
});

export default router;
