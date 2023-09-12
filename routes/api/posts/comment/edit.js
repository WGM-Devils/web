// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e200, e201, e204, e400, e401, e404 } = require("../../api");

// Code

router.patch("/edit?comment=:id", (req, res, next) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let comments = fs.readJsonSync("../../../../data/comments.json");
      if (posts[req.params.id] != undefined) {
        let comment = req.body;
        comment.lastUpdated = new Date().toLocaleString("de-DE", {
          timeZone: "UTC",
        });
        comments[req.params.id] = comment;
        fs.writeJsonSync("../../../data/comments.json", comments, {
          spaces: 4,
        });
        res.status(200).json(comment);
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
