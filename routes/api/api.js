// Imports

const router = require("express").Router();
const env = require("dotenv").config();

// Errors

const e200 = {
    code: 200,
    status: "OK",
    message: "Success!"
}
const e201 = {
    code: 201,
    status: "Created",
    message: "Successfully created the requested resource!"
}
const e204 = {
    code: 204,
    status: "No content",
    message: "There is no content!"
}
const e400 = {
    code: 400,
    status: "Bad Request",
    message: "The request has no authorization header!"
}
const e401 = {
    code: 401,
    status: "Unauthorized",
    message: "Check the authorization header!"
};

// Exports

module.exports = router;
module.exports = {
    e400, e401
}