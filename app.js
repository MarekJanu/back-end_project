const express = require("express");
const app = express();
app.use(express.json());
const {
  getTopics,
  getHello,
  getArticles,
  getArticleById,
} = require("./controllers/controller");

app.get("/api", getHello);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);

app.use((req, res, next) => {
  console.log(res.status);
  res.status(404).send({ msg: "Bad Request" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});
module.exports = app;
