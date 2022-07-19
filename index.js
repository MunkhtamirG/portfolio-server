const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
require("dotenv").config();
const PORT = process.env.PORT;
let profile;
let foods;
const cors = require("cors");

app.use(cors());

readFile("./models/profile.json", "utf-8", (err, profileData) => {
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

app.get("/profile", (req, res) => {
  res.send(profile);
});

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });

app.get("/ejs", (req, res) => {
  res.render("index");
});

app.get("/", (req, res) => {
  res.render("index", { name: "ozy" });
});

app.get("/404", (req, res) => {
  res.render("404", { message: "oopsie!" });
});

app.get("/js", (req, res) => {
  var data = {
    name: "John",
    hobbies: ["playing football", "playing chess", "cycling"],
  };
  res.render("js", { data: data });
});

app.get("/foods", (req, res) => {
  var data = {
    cinnamon: "https://images.media-allrecipes.com/userphotos/9175447.jpg",
    donut:
      "https://www.christinascucina.com/wp-content/uploads/2014/01/IMG_4471.jpg",
    pie: "https://www.thespruceeats.com/thmb/cro9EKoXGnuv3c5ui3kvSStMj6M=/3667x3667/smart/filters:no_upscale()/autumn-pumpkin-pie-3059962-hero-01-1e1571b6f48049fe853bce541a0d85e0.jpg",
  };
  res.render("foods", { data: data });
});
