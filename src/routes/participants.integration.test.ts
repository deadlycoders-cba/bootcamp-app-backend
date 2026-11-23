import request from "supertest";
import app from "../app.js";

describe("GET /api/participants", () => {
  it("returns 200", async () => {
    const response = await request(app).get("/api/participants");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

  });
});