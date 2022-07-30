const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
require("dotenv").config();
const PORT = process.env.PORT;
let profile;
const cors = require("cors");

app.use(cors());

readFile("./public/profile.json", "utf-8", (err, profileData) => {
  if (err) {
    console.error(err);
  } else {
    profile = JSON.parse(profileData);
  }
});

app.use(express.static("public"));

app.get("/name", (req, res) => {
  res.json({ name: profile.firstname });
});

app.get("/age", (req, res) => {
  res.send({ age: profile.age });
});

app.get("/major", (req, res) => {
  res.send({ major: profile.major });
});

app.get("/", (req, res) => {
  res.send(profile);
});

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
