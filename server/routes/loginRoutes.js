const router = require("express").Router();
const {
  signup,
  login,
  googleLogin,
  test,
  forgotPassword,
  resetPassword,
} = require("../controller/authentication");

router.post("/signup", signup);

router.post("/login", login);

router.post("/api/google-login", googleLogin);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/test", test);

module.exports = router;
