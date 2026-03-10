const uuid = require("uuid");

const tokens = {};

function setSessionCookie(res, session) {
  const token = uuid.v4();
  tokens[token] = session;
  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

function requireSession(req, res, next) {
  req.session = tokens[req.cookies["token"]];
  if (!req.session) return res.status(401).send({ msg: "Unauthorized" });
  next();
}

module.exports = { tokens, setSessionCookie, requireSession };
