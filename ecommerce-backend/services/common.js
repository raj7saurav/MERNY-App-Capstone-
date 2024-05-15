const passport = require("passport");

// route middleware -->
exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

// ye sanitizeUser function ka kaam ye hai ki ye kewal limited details hi server ke response me bhejega aur extra details hata dega like --> password, salt, etc... in sabko ye function hata dega.
exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  // console.log("cookie extracting -- ");
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }

  return token;
};
