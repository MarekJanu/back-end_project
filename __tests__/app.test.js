const seed = require("../db/seeds/seed");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const request = require("supertest");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  return db.end();
});

describe("app", () => {
  describe("/api", () => {
    it.only("should return 200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
          expect(response.body.msg).toBe("Hello!");
        });
    });
  });
});
