const handle404BadRequest = (req, res, next) => {
  res.status(404).send({ msg: "Bad Request" });
};

const handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

const handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = {
  handle404BadRequest,
  handleCustomErrors,
  handleServerErrors,
};
