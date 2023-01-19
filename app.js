const express = require("express");
const app = express();
app.use(express.json());
const {
  getTopics,
  getHello,
  getArticles,
  getArticleById,
  getCommentsByArticeId,
  postCommentByArticleId,
  patchVotesArticle,
} = require("./controllers/controller");
const {
  handleCustomErrors,
  handleServerErrors,
  handle404BadRequest,
} = require("./errors/index");

app.get("/api", getHello);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticeId);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);
app.patch("/api/articles/:article_id", patchVotesArticle);

app.use(handle404BadRequest);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
