// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e200, e201, e204, e400, e401, e404 } = require("../api");

// Code

router.delete("/delete?user=:id", (req, res, next) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let all = fs.readJsonSync("../../../data/users.json");
      if (all[req.params.id] != undefined) {
        delete all[req.params.id];
        fs.writeJsonSync("../../../data/users.json", all, { spaces: 4 });
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
