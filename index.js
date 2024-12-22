const express = require("express");
const path = require("path");
const userRoute = require("./route/user");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/blogify").then(() => {
  console.log("mongodb connectd");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/user", userRoute).listen(4000);
