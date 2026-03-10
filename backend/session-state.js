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

module.exports = { tokens, setSessionCookie };
