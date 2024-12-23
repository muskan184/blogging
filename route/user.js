const { Router } = require("express");
const User = require("../model/user");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const Token = await User.matchPassword(email, password);
    return res.cookie("token", Token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "incorrect email and password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  await User.create({
    fullname,
    email,
    password,
  });
  return res.redirect("/");
});

module.exports = router;
