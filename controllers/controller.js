const {
  selectTopics,
  selectArticles,
  selectArticleById,
  selectCommentsByArticleId,
  fetchArticleById,
  insertCommentByArticleId,
  checkUsername,
  updateVotesCount,
  fetchUsers,
} = require("../models/models");

const getHello = (req, res, next) => {
  res.status(200).send({ msg: "Hello!" });
};
const getTopics = (req, res, next) => {
  selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

const getArticles = (req, res, next) => {
  const { topic, sort_by, order } = req.query;

  selectArticles(topic, sort_by, order)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch(next);
};
const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
const getCommentsByArticeId = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([
    fetchArticleById(article_id),
    selectCommentsByArticleId(article_id),
  ])
    .then(([article, comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
const postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  Promise.all([
    checkUsername(username),
    fetchArticleById(article_id),
    insertCommentByArticleId(body, username, article_id),
  ])
    .then(([user, article, comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
const patchVotesArticle = (req, res, next) => {
  const { inc_votes: updateVotesBy } = req.body;
  const { article_id } = req.params;
  Promise.all([
    fetchArticleById(article_id),
    updateVotesCount(updateVotesBy, article_id),
  ]).then(([articleOriginal, articleUpdated]) => {
    res.status(200).send(articleUpdated);
  });
};
const getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

module.exports = {
  getTopics,
  getHello,
  getArticles,
  getArticleById,
  getCommentsByArticeId,
  postCommentByArticleId,
  patchVotesArticle,
  getUsers,
};
