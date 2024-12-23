const { validateToken } = require("./servies/auth");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookiValue = req.cookies[cookieName];
    if (!tokenCookiValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookiValue);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
