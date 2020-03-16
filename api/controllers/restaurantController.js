const validator = require("express-validator");
const restaurantModel = require("../models/restaurantModel");
const analitycModel = require("../models/analitycModel");

/**
 * @desc Clase de tipo controller para manejar las busquedas asociadas a los restaurantes.
 */
class restaurantController {
  /**
   * @desc Funcion estatica para manejar las busqueda de restaurantes.
   */
  static async searchRestaurants(req, res) {
    // Valido si los parametros enviados son correctos
    const errors = validator.validationResult(req);
    // Si hay errores devuelve un error de tipo 422 indicando los campos que fallaron.
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // Obtengo los datos necesarios para la busqueda
    const { authorization = "" } = req.headers;
    const { query } = req;
    // Llamo a la funcion del modelo para buscar los restaurantes
    const response = await restaurantModel.searchRestaurants(
      authorization,
      query
    );
    // Valido el status para dar respuesta a la peticion
    if (response.status) {
      const { code } = response.data;
      res.status(422).send(code);
    } else {
      const analityc = new analitycModel();
      analityc.name = "search";
      analityc.value = query;
      analityc.save();
      res.status(200).send(response);
    }
  }
}

module.exports = restaurantController;
