const router = require("express").Router();
const analitycController = require("../controllers/analitycController");

router.get("/getSearchs", analitycController.getSearchs);
router.get("/getLoggeds", analitycController.getLoggeds);

module.exports = router;
