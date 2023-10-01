// Imports

const express = require("express");
const env = require("dotenv").config();
const randomString = require("random-string");
const cors = require("cors");
const path = require("path");

// Settings

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PATCH"],
    origin: "*",
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.listen(8000, () => {
  console.log("Server running on port 8000");
});

// Code

const API = require("./routes/api/api");
app.use("/api/", API);
