const express = require("express");
const uuid = require("uuid");
const app = express();

app.use(express.json());

const users = [];

app.post("/auth/create", (req, res) => {
  const { username, password } = req.body;
  const token = uuid.v4();
  users.push({ username, password, token });
  res.send({ token });
});

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((nextUser) => nextUser.username === username);
  if (user && user.password === password) {
    user.token = uuid.v4();
    res.send({ token: user.token });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
