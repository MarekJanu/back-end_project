const express = require("express");
const app = express();
app.use(express.json());
const { getTopics, getHello } = require("./controllers/controller");

app.get("/api", getHello);
app.get("/api/topics", getTopics);

module.exports = app;
