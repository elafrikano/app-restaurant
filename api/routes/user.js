const router = require("express").Router();
const validator = require("express-validator");
const userController = require("../controllers/userController");

router.post(
  "/login",
  [
    validator.check("email").isEmail(),
    validator.check("password").isLength({ min: 5 })
  ],
  userController.login
);

router.get("/getUser", userController.getUser);

module.exports = router;
