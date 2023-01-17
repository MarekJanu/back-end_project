const {
  selectTopics,
  selectArticles,
  selectArticleById,
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
  selectArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};
const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id).then((article) => {
    res.status(200).send({ article });
  });
};
module.exports = { getTopics, getHello, getArticles, getArticleById };
