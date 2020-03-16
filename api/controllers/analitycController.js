const analitycModel = require("../models/analitycModel");

/**
 * @desc Clase de tipo controller para manejar datos de analitycs de la app.
 */
class analitycController {
  /**
   * @desc Funcion estatica para manejas todas las busquedas realizadas.
   */
  static async getSearchs(req, res) {
    try {
      const response = await analitycModel
        .find({ name: "search" })
        .select("name value -_id");
      res.status(200).send({ searchs: { response } });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  /**
   * @desc Funcion estatica para manejas todas las busquedas realizadas.
   */
  static async getLoggeds(req, res) {
    try {
      const response = await analitycModel.find({ name: "login" });
      res.status(200).send({ loggeds: response.length });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = analitycController;
