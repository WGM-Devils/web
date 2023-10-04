// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e400, e401, e404 } = require("../api");

// Code

router.get("/get?post=:id", (req, res) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let posts = fs.readJsonSync("data/posts.json");
      if (posts[req.params.id] != undefined) {
        res.status(200).json(posts[req.params.id]);
      } else {
        res.status(404).json(e404);
      }
    } else {
      res.status(401).json(e401);
    }
  } else {
    res.status(400).json(e400);
  }
});

// Exports

module.exports = router;
