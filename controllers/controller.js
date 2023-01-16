const { selectTopics } = require("../models/models");

const getHello = (req, res, next) => {
  res.status(200).send({ msg: "Hello!" });
};
const getTopics = (req, res, next) => {
  selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
module.exports = { getTopics, getHello };
