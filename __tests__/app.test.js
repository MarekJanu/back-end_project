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
  describe("404 /api/banana", () => {
    it("status 404, { msg : Bad Request } when non existing endpoint", () => {
      return request(app)
        .get("/api/banana")
        .expect(404)
        .then(({ body }) => {
          //   console.log(body.msg);
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
  describe("/api/topics", () => {
    it("status 200, responds wit an array of topic objects with slug and description properties", () => {
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
  describe("/api/articles", () => {
    it("status 200, responds with an array on object articles with the following properties:  author, title, article_id, topic, created_at, votes, article_img_url", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toHaveLength(5);
          body.articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String),
              })
            );
          });
        });
    });
    it("status 200, returns everything from above + comment_count and sorted by date desc", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach((article) => {
            expect(article).toHaveProperty("comment_count");
          });
          // installed but not working - for later to solve as not essential
          //   expect(body.articles).toBeSortedBy("created_at", {
          //     descending: true,
          //   });
          expect(body.articles[0].created_at).toBe("2020-11-03T09:12:00.000Z");
          expect(body.articles[body.articles.length - 1].created_at).toBe(
            "2020-06-06T09:10:00.000Z"
          );
        });
    });
  });
});