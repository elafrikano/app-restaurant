var router = require("express").Router();
var userRoutes = require("./user");
var restaurantRoutes = require("./restaurant");

router.use("/user", userRoutes);
router.use("/restaurant", restaurantRoutes);

module.exports = router;
