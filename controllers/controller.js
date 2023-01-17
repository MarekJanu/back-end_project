const { selectTopics, selectArticles } = require("../models/models");

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
    // console.log(articles);
    res.status(200).send({ articles });
  });
};
module.exports = { getTopics, getHello, getArticles };
