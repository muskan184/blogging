const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { error } = require("console");
const { createTokenforuser } = require("../servies/auth");

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "/images/default.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = "someRandomPassword";
  const hashedPass = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPass;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw Error("user not found");

  // console.log(user);

  const salt = user.salt;
  const hashedPass = user.password;

  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPass !== userProvidedHash) throw new Error("incorrect pasword");

  const Token = createTokenforuser(user);
  return Token;
});
const User = model("user", userSchema);

module.exports = User;
