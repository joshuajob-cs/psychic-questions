import request from "supertest";
import express from "express";
import cookieParser from "cookie-parser";
import authService from "../auth-service.js";
import { client, userCollection } from "../database/database.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authService);

afterAll(async () => {
  await client.close();
});

beforeAll(async () => {
  await userCollection.deleteMany({});
});

describe("Auth Service", () => {
  test("sign up a new user", async () => {
    const res = await request(app)
      .post("/auth/sign-up")
      .send({ username: "signupuser", password: "testpass" });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe("signupuser");
  });

  test("duplicate signup", async () => {
    await request(app)
      .post("/auth/sign-up")
      .send({ username: "dupuser", password: "testpass" });

    const res = await request(app)
      .post("/auth/sign-up")
      .send({ username: "dupuser", password: "testpass" });

    expect(res.status).toBe(409);
  });

  test("login with correct password", async () => {
    await request(app)
      .post("/auth/sign-up")
      .send({ username: "loginuser", password: "testpass" });

    const res = await request(app)
      .post("/auth/login")
      .send({ username: "loginuser", password: "testpass" });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe("loginuser");
  });

  test("login with wrong password", async () => {
    await request(app)
      .post("/auth/sign-up")
      .send({ username: "wrongpassuser", password: "testpass" });

    const res = await request(app)
      .post("/auth/login")
      .send({ username: "wrongpassuser", password: "wrongpass" });

    expect(res.status).toBe(401);
  });
});
