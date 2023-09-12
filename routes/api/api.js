// Imports

const router = require("express").Router();
const env = require("dotenv").config();

// Errors

const e200 = {
  code: 200,
  status: "OK",
  message: "Success!",
};
const e201 = {
  code: 201,
  status: "Created",
  message: "Successfully created the requested resource!",
};
const e204 = {
  code: 204,
  status: "No content",
  message: "There is no content!",
};
const e400 = {
  code: 400,
  status: "Bad Request",
  message: "The request has no authorization header!",
};
const e401 = {
  code: 401,
  status: "Unauthorized",
  message: "Check the authorization header!",
};
const e404 = {
  code: 404,
  status: "Not found",
  message: "The requested resource does not exist in our data!",
};

// Code

// Users

router.use("/users", require("./users/all"));
router.use("/users", require("./users/delete"));
router.use("/users", require("./users/set"));
router.use("/users", require("./users/edit"));
router.use("/users", require("./users/get"));

// Posts

router.use("/posts", require("./posts/all"));
router.use("/posts", require("./posts/delete"));
router.use("/posts", require("./posts/edit"));
router.use("/posts", require("./posts/send"));
router.use("/posts", require("./posts/get"));
// Views
router.use("/posts", require("./posts/viewed"));
// Likes
router.use("/posts/likes", require("./posts/likes/like"));
router.use("/posts/likes", require("./posts/likes/unlike"));
// Comments
router.use("/posts/comments", require("./posts/comment/add"));
router.use("/posts/comments", require("./posts/comment/delete"));
router.use("/posts/comments", require("./posts/comment/edit"));

// 404

router.use(function (req, res) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.render("404", { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

// Exports

module.exports = router;
module.exports = {
  e200,
  e201,
  e204,
  e400,
  e401,
  e404,
};
