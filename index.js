const express = require("express");
const path = require("path");
const userRoute = require("./route/user");
const blogRoute = require("./route/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./authentication");
const Blog = require("./model/blog");
const app = express();

mongoose.connect("mongodb://localhost:27017/blogify").then(() => {
  console.log("mongodb connectd");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./uploads")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});
app.use("/user", userRoute);
app.use("/blog", blogRoute).listen(7000);
