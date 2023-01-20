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
        .then(({ body: err }) => {
          expect(err.msg).toBe("Bad Request");
        });
    });
    it(" status 400, { msg : Bad Request } on non existing id and invalid end-point /api/articles/42/hello", () => {
      return request(app)
        .get("/api/articles/42/hello")
        .expect(404)
        .then(({ body: err }) => {
          expect(err.msg).toBe("Bad Request");
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
          expect(comments).toHaveLength(11);
          comments.forEach((article) => {
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
        .then(({ body: err }) => {
          expect(err.msg).toBe("article id not found");
        });
    });
    it("200 response with msg no comments found if valid article id but no comments created", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("no comments found");
        });
    });
  });
  describe("POST /api/articles/:article_id/comments", () => {
    it("accepts an object(the request body) with properties: username, body. Responds with posted comment if username exists and if article_id exists", () => {
      const inputBody = {
        username: "lurker",
        body: "my test comment with text emoji (*′☉.̫☉)",
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(inputBody)
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment).toEqual({
            comment_id: 19,
            body: "my test comment with text emoji (*′☉.̫☉)",
            article_id: 1,
            author: "lurker",
            votes: 0,
            created_at: expect.any(String),
          });
        });
    });
    it("responds with error msg when request with nonexisting username", () => {
      const inputBody = {
        username: "ziutek13",
        body: "pierwszy!!!! ✌(ツ)",
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(inputBody)
        .expect(404)
        .then(({ body: err }) => {
          expect(err.msg).toBe("username not found");
        });
    });
    it("responds with error msg when request with nonexisting article_id (but still a number)", () => {
      const inputBody = {
        username: "lurker",
        body: "pierwszy!!!! ✌(ツ)",
      };
      return request(app)
        .post("/api/articles/100/comments")
        .send(inputBody)
        .expect(404)
        .then(({ body: err }) => {
          expect(err.msg).toBe("article id not found");
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    it("Request body accepts an object in the form { inc_votes: newVote }, updating votes, responds with the updated article", () => {
      const inputBody = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/3")
        .send(inputBody)
        .expect(200)
        .then(({ body: article }) => {
          expect(article).toEqual({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 1,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    it("Request body accepts an object in the form { inc_votes: newVote }, updating votes, responds with the updated article - decrementing number of votes", () => {
      const inputBody = { inc_votes: -3 };
      return request(app)
        .patch("/api/articles/3")
        .send(inputBody)
        .expect(200)
        .then(({ body: article }) => {
          expect(article).toEqual({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: -3,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
  });
  describe("/api/users", () => {
    it("200 - responds with an array of user objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual([
            {
              username: "butter_bridge",
              name: "jonny",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
            },
            {
              username: "icellusedkars",
              name: "sam",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
            },
            {
              username: "rogersop",
              name: "paul",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
            },
            {
              username: "lurker",
              name: "do_nothing",
              avatar_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            },
          ]);
        });
    });
  });
});
