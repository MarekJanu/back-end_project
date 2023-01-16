const db = require("../db/connection");

const selectTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows: topics }) => {
    return topics;
  });
};
const selectArticles = () => {
  return db
    .query(
      "SELECT author, title, article_id, topic, created_at, votes, article_img_url FROM articles;"
    )
    .then(({ rows: articles }) => {
      return articles;
    });
};

module.exports = { selectTopics, selectArticles };
