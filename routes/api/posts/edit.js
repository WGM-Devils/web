// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e200, e201, e204, e400, e401, e404 } = require("../api");

// Code

router.patch("/edit?post=:id", (req, res, next) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let posts = fs.readJsonSync("../../../data/posts.json");
      if (posts[req.params.id] != undefined) {
        let message = req.body;
        message.lastUpdated = new Date().toLocaleString("de-DE", {
          timeZone: "UTC",
        });
        posts[req.params.id] = message;
        fs.writeJsonSync("../../../data/posts.json", posts, { spaces: 4 });
        res.status(200).json(message);
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
