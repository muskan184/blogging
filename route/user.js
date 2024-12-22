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
  console.log(email, password);
  const user = User.matchPassword(email.password);

  console.log("User", user);
  return res.redirect("/");
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
