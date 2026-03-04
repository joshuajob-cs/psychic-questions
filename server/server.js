const express = require("express");
const app = express();

app.use(express.json());

const users = [];

app.post("/auth/create", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.send({ username });
});

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((nextUser) => nextUser.username === username);
  if (user && user.password === password) {
    res.send({ username });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
