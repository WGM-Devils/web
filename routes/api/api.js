// Imports

const router = require("express").Router();
const env = require("dotenv").config();

// Errors

const e400 = {
    code: 400,
    error: "Bad Request",
    message: "The request has no authorization header!"
}
const e401 = {
    code: 401,
    error: "Unauthorized",
    message: "Check the authorization header!"
};

// Exports

module.exports = router;
module.exports = {
    e400, e401
}