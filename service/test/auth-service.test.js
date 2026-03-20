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
      .send({ username: "testuser", password: "testpass" });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe("testuser");
  });
});
