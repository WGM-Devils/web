// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e200, e201, e204, e400, e401 } = require("../api");

// Code

router.get("/send", (req, res, next) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let all = fs.readJsonSync("../../../data/users.json");
      let posts = fs.readJsonSync("../../../data/messages.json");
      let comments = fs.readJsonSync("../../../data/comments.json");
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
      let message = req.body;
      if (all[message.user] != undefined) {
        message.createdAt = new Date().toLocaleString("de-DE", {
          timeZone: "UTC",
        });
        message.lastUpdated = new Date().toLocaleString("de-DE", {
          timeZone: "UTC",
        });
        posts[id] = message;
        fs.writeJsonSync("../../../data/messages.json", posts);
        res.status(200).json(message);
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