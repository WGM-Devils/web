// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e400, e401 } = require("../api");

// Code

router.post("/viewed?user=:id/post=:post", (req, res) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let posts = fs.readJsonSync("../../../data/posts.json");
      res.status(200).json(posts);
    } else {
      res.status(401).json(e401);
    }
  } else {
    res.status(400).json(e400);
  }
});

// Exports

module.exports = router;
