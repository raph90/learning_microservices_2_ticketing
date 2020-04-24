import { app } from "./../../app";
import request from "supertest";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "raph@hello.com",
      password: "password",
    })
    .expect(201);
});

it("returns 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "raphhello.com",
      password: "password",
    })
    .expect(400);
});
it("returns 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "raph@hello.com",
      password: "p",
    })
    .expect(400);
});
it("returns 400 with both missing ", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "raph@hello.com",
      password: "password",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "raph@hello.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "raph@hello.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
