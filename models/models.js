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
  return db
    .query("SELECT * FROM articles WHERE articles.article_id = $1;", [id])
    .then(({ rows: article }) => {
      return article[0];
    });
};
const selectCommentsByArticleId = (id) => {
  const queryStr =
    "SELECT * FROM comments WHERE comments.article_id = $1 ORDER BY comments.created_at DESC;";
  return db.query(queryStr, [id]).then(({ rowCount, rows }) => {
    if (rowCount === 0) {
      return Promise.reject({ status: 404, msg: "no comments found" });
    } else {
      return rows;
    }
  });
};
const fetchArticleById = (id) => {
  const queryStr = "SELECT * FROM articles WHERE article_id = $1;";
  return db.query(queryStr, [id]).then(({ rowCount, rows }) => {
    if (rowCount === 0) {
      return Promise.reject({ status: 404, msg: "article id not found" });
    } else {
      return rows[0];
    }
  });
};

const checkUsername = (username) => {
  const queryStr = "SELECT * FROM users WHERE users.username = $1;";
  return db.query(queryStr, [username]).then(({ rowCount, rows }) => {
    if (!rowCount) {
      return Promise.reject({ status: 404, msg: "username not found" });
    }
    return rows[0];
  });
};

const insertCommentByArticleId = (body, username, article_id) => {
  const queryStr =
    "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING*;";
  return db.query(queryStr, [body, username, article_id]).then((response) => {
    return response.rows;
  });
};
module.exports = {
  selectTopics,
  selectArticles,
  selectArticleById,
  selectCommentsByArticleId,
  fetchArticleById,
  insertCommentByArticleId,
  checkUsername,
};
