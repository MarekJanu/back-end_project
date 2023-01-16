const getHello = (req, res, next) => {
  res.status(200).send({ msg: "Hello!" });
};
const getTopics = () => {};
module.exports = { getTopics, getHello };
