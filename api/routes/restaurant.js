const router = require("express").Router();
const validator = require("express-validator");
const restaurantController = require("../controllers/restaurantController");

router.get(
  "/searchRestaurants",
  [
    validator.check("country").isInt(),
    validator
      .check("latitude")
      .not()
      .isEmpty(),
    validator
      .check("longitude")
      .not()
      .isEmpty()
  ],
  restaurantController.searchRestaurants
);

module.exports = router;
