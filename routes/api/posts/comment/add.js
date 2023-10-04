// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e400, e401 } = require("../../api");

// Code

router.post("/add", (req, res) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let all = fs.readJsonSync("data/users.json");
      let posts = fs.readJsonSync("data/posts.json");
      let comments = fs.readJsonSync("data/comments.json");
      let id = randomString({
        length: 30,
        numeric: true,
        letters: false,
        special: false,
      });
      while (
        all[id] != undefined &&
        posts[id] != undefined &&
        comments[id] != undefined
      ) {
        id = randomString({
          length: 30,
          numeric: true,
          letters: false,
          special: false,
        });
      }
      let comment = req.body;
      if (all[comment.user] != undefined) {
        message.createdAt = new Date().toLocaleString("de-DE", {
          timeZone: "UTC",
        });
        comment.lastUpdated = new Date().toLocaleString("de-DE", {
          timeZone: "UTC",
        });
        comments[id] = comment;
        fs.writeJsonSync("data/comments.json", comments);
        res.status(200).json(comment);
      } else {
        res.status(500);
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
