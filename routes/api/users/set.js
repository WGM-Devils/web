// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e200, e201, e204, e400, e401 } = require("../api");
const randomString = require("random-string");

// Code

router.post("/new", (req, res, next) => {
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
      let user = req.body;
      user.createdAt = new Date().toLocaleString("de-DE", { timeZone: "UTC" });
      user.posts = {
        counter: 0,
        ids: [],
      };
      user.comments = {
        counter: 0,
        ids: [],
      };
      user.likes = {
        counter: 0,
        ids: 0,
      };
      user.lastUpdated = new Date().toLocaleString("de-DE", {
        timeZone: "UTC",
      });
      all[id] = user;
      fs.writeJsonSync("../../../data/users.json", all, { spaces: 4 });
      res.status(200).json(user);
    } else {
      res.status(401).json(e401);
    }
  } else {
    res.status(400).json(e400);
  }
});

// Exports

module.exports = router;
