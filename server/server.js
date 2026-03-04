const express = require("express");
const uuid = require("uuid");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const users = [];
const tokens = {};

app.post("/auth/create", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  const token = uuid.v4();
  tokens[token] = username;
  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
  res.send({ username });
});

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((nextUser) => nextUser.username === username);
  if (user && user.password === password) {
    const token = uuid.v4();
    tokens[token] = username;
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
    res.send({ username });
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
