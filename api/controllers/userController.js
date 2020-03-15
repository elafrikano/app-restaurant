const validator = require("express-validator");
const userModel = require("../models/userModel");

class userController {
  static async login(req, res) {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const response = await userModel.login(email, password);

    if (response.status === 403) {
      const { code } = response.data;
      res.status(401).send({ status: 401, code });
    } else {
      res.status(200).send({ status: 200, response });
    }
  }

  static async getUser(req, res) {
    const { authorization = "" } = req.headers;
    try {
      const response = await userModel.getUser(authorization);
      res.status(200).send(response);
    } catch (error) {
      res.status(error.status).send(error);
    }
  }
}

module.exports = userController;
