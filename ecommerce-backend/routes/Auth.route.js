const passport = require("passport");
const {
  createUser,
  loginUser,
  logoutUser,
  checkAuth,
} = require("../controller/Auth.controller");
const router = require("express").Router();

router.post("/signup", createUser);
router.post("/login", passport.authenticate("local"), loginUser); 
router.get("/check", passport.authenticate("jwt"), checkAuth);
router.get("/logout", logoutUser); 

exports.router = router;