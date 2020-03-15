const validator = require("express-validator");
const restaurantModel = require("../models/restaurantModel");

class restaurantController {
  static async searchRestaurants(req, res) {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { authorization = "" } = req.headers;
    const { query } = req;

    try {
      const response = await restaurantModel.searchRestaurants(
        authorization,
        query
      );
      res.status(200).send(response);
    } catch (error) {
      res.status(422).send(error);
    }
  }
}

module.exports = restaurantController;
