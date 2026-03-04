const express = require("express");
const app = express();

app.use(express.json());

const users = [];

app.post("/auth/create", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.send({ username });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
