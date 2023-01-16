const express = require("express");
const app = express();
app.use(express.json());
const { getTopics, getHello } = require("./controllers/controller");

app.get("/api", getHello);
app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});
module.exports = app;
