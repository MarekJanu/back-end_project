const db = require("../db/connection");

const selectTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows: topics }) => {
    return topics;
  });
};
const selectArticles = (
  topic = "default_all_topics",
  sort_by = "created_at",
  order = "DESC"
) => {
  const sortWhiteList = [
    "created_at",
    "article_id",
    "title",
    "author",
    "body",
    "author",
    "votes",
    "article_img_url ",
  ];
  const orderWhiteList = ["ASC", "DESC"];
  if (!sortWhiteList.includes(sort_by)) {
    return Promise.reject({
      status: 404,
      msg: `cannot sort by ${sort_by}, invalid criteria`,
    });
  } else if (!orderWhiteList.includes(order)) {
    return Promise.reject({
      status: 404,
      msg: `cannot order by ${order}, invalid criteria`,
    });
  } else {
    let queryStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT (comments.comment_id)::int AS comment_count FROM articles JOIN comments ON articles.article_id = comments.article_id `;
    let quertStrEnd = `GROUP BY articles.article_id ORDER BY articles.${sort_by} ${order};`;
    topic === "default_all_topics"
      ? (queryStr += quertStrEnd)
      : (queryStr += `WHERE articles.topic = '${topic}' ` + quertStrEnd);

    return db.query(queryStr).then((topics) => {
      if (!topics.rowCount) {
        return Promise.reject({ status: 404, msg: "topic not found" });
      } else {
        return topics.rows;
      }
    });
  }
};

const selectArticleById = (id) => {
  return db
    .query(
      "SELECT articles.author, articles.title, articles.body, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT (comments.comment_id)::int AS comment_count FROM articles JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;",
      [id]
    )
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
    return response.rows[0];
  });
};
const updateVotesCount = (updateVotesBy, article_id) => {
  const queryStr =
    "UPDATE articles SET votes = articles.votes + $1 WHERE articles.article_id = $2 RETURNING *;";
  return db.query(queryStr, [updateVotesBy, article_id]).then(({ rows }) => {
    return rows[0];
  });
};
const fetchUsers = () => {
  const queryStr = "SELECT * FROM users;";
  return db.query(queryStr).then((users) => {
    return users.rows;
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
  updateVotesCount,
  fetchUsers,
};
