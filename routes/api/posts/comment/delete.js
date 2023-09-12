// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e200, e201, e204, e400, e401, e404 } = require("../../api");

// Code

router.delete("/delete?comment=:id", (req, res, next) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let users = fs.readJsonSync("../../../../data/users.json");
      let posts = fs.readJsonSync("../../../../data/posts.json");
      let comments = fs.readJsonSync("../../../../data/comments.json");
      if (comments[req.params.id] != undefined) {
        if (posts[comments[req.params.id].post] != undefined) {
          if (users[comments[req.id.post].author] != undefined) {
            let comment = comments[req.params.id];
            delete comments[req.params.id];
            fs.writeJsonSync("../../../../data/comments.json", comments, {
              spaces: 4,
            });
            let user = users[comment.author];
            let post = posts[comment.post];
            post.comments.counter = parseInt(post.comments.counter) - 1;
            post.comments.ids = post.comments.ids.splice(
              post.comments.ids.indexOf(comment.post)
            );
            posts[comment.post] = post;
            fs.writeJsonSync("../../../../data/posts.json", posts, {
              spaces: 4,
            });
            user.comments.counter = parseInt(user.comments.counter) - 1;
            user.comments.ids = user.comments.ids.splice(
              user.comments.ids.indexOf(comment.author)
            );
            users[comment.author] = user;
            fs.writeJsonSync("../../../../data/users.json", users, {
              spaces: 4,
            });
            res.status(204).json(e204);
          } else {
            res.status(500);
          }
        } else {
          res.status(500);
        }
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