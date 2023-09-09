// Imports

const router = require("express").Router();
const env = require("dotenv").config();
const fs = require("fs-extra");
const { e200, e201, e204, e400, e401 } = require("../api");

// Exports

router.get("/all", (req, res, next) => {
    if (req.headers["authorization"] !== "") {
        if (req.headers["authorization"] === process.env.KEY) {
            let all = fs.readJsonSync("../../../data/users.json");
            res.status(200).json(all);
        } else {
            res.status(401).json(e401);
        }
    } else {
        res.status(400).json(e400);
    }
})
module.exports = router;