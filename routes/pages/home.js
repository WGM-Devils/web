// Imports

const router = require("express").Router();

// Code

router.get("/" || "/home", (req, res) => {
  res.render("index");
});

// Exports

module.exports = router;
