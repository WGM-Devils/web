// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e400, e401, e404 } = require("../api");

// Code

router.patch("/edit?user=:id", (req, res) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let all = fs.readJsonSync("../../../data/users.json");
      if (all[req.params.id] != undefined) {
        let user = req.body;
        user.lastUpdated = new Date().toLocaleString("de-DE", {
          timeZone: "UTC",
        });
        all[req.params.id] = user;
        fs.writeJsonSync("../../../data/users.json", all, { spaces: 4 });
        res.status(200).json(user);
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
