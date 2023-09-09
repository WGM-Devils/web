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
const e404 = {
    code: 404,
    status: "Not found",
    message: "The requested resource does not exist in our data!"
}

// Exports

module.exports = router;
module.exports = {
    e200, e201, e204, e400, e401, e404
}