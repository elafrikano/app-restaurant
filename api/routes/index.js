var router = require("express").Router();
var userRoutes = require("./user");
var restaurantRoutes = require("./restaurant");
var analitycRoutes = require("./analityc");

router.use("/user", userRoutes);
router.use("/restaurant", restaurantRoutes);
router.use("/analitycs", analitycRoutes);

module.exports = router;
