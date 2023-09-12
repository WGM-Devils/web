// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e400, e401 } = require("../api");

// Code

router.get("/" || "/home", (req, res) => {
  res.render("index");
});

// Exports

module.exports = router;
