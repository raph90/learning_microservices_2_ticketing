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
