// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e200, e201, e204, e400, e401, e404 } = require("../api");

// Code

router.delete("/unliked?user=:id/post=:post", (req, res, next) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let users = fs.readJsonSync("../../../data/users.json");
      let posts = fs.readJsonSync("../../../data/posts.json");
      if (posts[req.params.post] != undefined) {
        if (users[req.params.id] != undefined) {
          (posts[req.params.post].likes.counter =
            parseInt(posts[req.params.post].likes.counter) - 1),
            posts[req.params.post].likes.users.splice(
              posts[req.params.post].likes.users.indexOf(req.params.id)
            );
          fs.writeJsonSync("../../../data/messages.json", posts, { spaces: 4 });
          res.status(204).json(e204);
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
