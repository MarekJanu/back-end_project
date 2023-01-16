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
    it("should return 200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
          expect(response.body.msg).toBe("Hello!");
        });
    });
  });
  describe("/api/topics", () => {
    it.only("status 200, responds wit an array of topic objects with slug and description properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toHaveLength(3);
          body.topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String),
              })
            );
          });
        });
    });
  });
});
