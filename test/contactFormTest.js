import { describe, it } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../databases/get_data/customer_conact_forrm_db_get.js";

describe("Contact Form API ", () => {
  it("Should successfully submit contact form", async () => {
    const res = await request(app).post("/submit-contact").send({
      firstName: "Test",
      lastname: "User",
      email: "test@example.com",
      countryCode: "+1",
      phoneNumber: "1234567890",
    });
    assert.equal(res.status, 200);
    assert.equal(res.text, "Contact form submitted successfully!");
  });
});
