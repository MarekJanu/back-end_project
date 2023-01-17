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
          expect(body.articles[0].created_at).toBe("2020-11-03T09:12:00.000Z");
          expect(body.articles[body.articles.length - 1].created_at).toBe(
            "2020-06-06T09:10:00.000Z"
          );
        });
    });
  });
  describe("/api/articles/:article_id", () => {
    it("returns an object with the followin properties: author, title, article_id, body, topic, created_at, votes, article_img_url", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
  });
  describe(" /api/articles/:article_id/comments", () => {
    it("returns with an array of comments (objects) for given article_id, where each comment have the following properties: comment_id, votes, created_at, author, body, article_id", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          const selectedComments = comments[1];
          expect(selectedComments).toHaveLength(11);
          selectedComments.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                body: expect.any(String),
                article_id: expect.any(Number),
                comment_id: expect.any(Number),
                created_at: expect.any(String),
                votes: expect.any(Number),
              })
            );
          });
        });
    });
  });
  describe("404 for technically valid yet non-existing article id", () => {
    it("responds with 404 and article_id not found -> path -> /api/articles/42/comments", () => {
      return request(app)
        .get("/api/articles/42/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("article id not found");
        });
    });
  });
});
