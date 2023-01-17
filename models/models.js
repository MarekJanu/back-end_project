const db = require("../db/connection");

const selectTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows: topics }) => {
    return topics;
  });
};
const selectArticles = () => {
  return db
    .query(
      "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT (comments.comment_id) AS comment_count FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;"
    )
    .then(({ rows: articles }) => {
      return articles;
    });
};
const selectArticleById = (id) => {
  let idArr = Object.values(id);
  return db
    .query("SELECT * FROM articles WHERE articles.article_id = $1;", idArr)
    .then(({ rows: article }) => {
      return article[0];
    });
};

module.exports = { selectTopics, selectArticles, selectArticleById };
