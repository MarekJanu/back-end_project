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
} = require("./controllers/controller");

app.get("/api", getHello);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticeId);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.use((req, res, next) => {
  res.status(404).send({ msg: "Bad Request" });
});
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});
module.exports = app;
