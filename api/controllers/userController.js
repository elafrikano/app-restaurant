const validator = require("express-validator");
const userModel = require("../models/userModel");
const analitycModel = require("../models/analitycModel");

/**
 * @desc Clase de tipo controller para manejar el inicio de sesion y datos del usuario logeado.
 */
class userController {
  /**
   * @desc Funcion estatica para manejar el inicio de sesion en la app.
   */
  static async login(req, res) {
    // Valido que los parametros enviados sean correctos
    const errors = validator.validationResult(req);
    // Si hay errores devuelve un error de tipo 422 indicando los campos que fallaron.
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // Obtengo los datos necesarios para el login
    const { email, password } = req.body;
    // Llamo a la funcion del modelo para hacer el login
    const response = await userModel.login(email, password);
    // Valido el status para dar respuesta a la peticion
    if (response.status === 403) {
      const { code } = response.data;
      res.status(422).send(code);
    } else {
      res.status(200).send(response);
      const analityc = new analitycModel();
      analityc.name = "login";
      analityc.save();
    }
  }

  /**
   * @desc Funcion estatica para obtener los datos del usuario
   */
  static async getUser(req, res) {
    // Obtengo los datos necesarios
    const { authorization = "" } = req.headers;
    // Llamo a la funcion del modelo para obtener los datos
    const response = await userModel.getUser(authorization);
    console.log();
    // Valido el status para dar respuesta a la peticion
    if (response.status) {
      const { code } = response.data;
      res.status(422).send(code);
    } else {
      res.status(200).send(response);
    }
  }
}

module.exports = userController;
