import { v4 as uuidv4 } from "uuid";

const tokens = {};

function setSessionCookie(res, session) {
  const token = uuidv4();
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

function requireLogin(req, res, next) {
  req.session = tokens[req.cookies["token"]];
  if (!req.session || !req.session.username)
    return res.status(401).send({ msg: "Unauthorized" });
  next();
}

export { tokens, setSessionCookie, requireSession, requireLogin };
