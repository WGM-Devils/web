// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e200, e201, e204, e400, e401, e404 } = require("../api");

// Code

router.delete("/delete?post=:id", (req, res, next) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let posts = fs.readJsonSync("../../../data/posts.json");
      let comments = fs.readJsonSync("../../../data/comments.json");
      if (posts[req.params.id] != undefined) {
        let comment = posts[req.params.id].comments;
        if (comment.length > 0) {
          comment.forEach((e) => {
            if (comments[e] != undefined) {
              delete comments[e];
            }
          });
          fs.writeJsonSync("../../../data/comments.json", comments, {
            spaces: 4,
          });
        }
        delete posts[req.params.id];
        fs.writeJsonSync("../../../data/messages.json", posts, { spaces: 4 });
        res.status(204).json(e204);
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
