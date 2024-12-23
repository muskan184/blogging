const JWT = require("jsonwebtoken");
const secret = "muskan@184";

function createTokenforuser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profilePhoto: user.profilePhoto,
    role: user.role,
  };
  const Token = JWT.sign(payload, secret);
  return Token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenforuser,
  validateToken,
};
