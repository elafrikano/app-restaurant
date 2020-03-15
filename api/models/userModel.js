const pedidosYaService = require("../services/pedidosYaService");

const pedidosYa = new pedidosYaService();

class userModel {
  static async login(email, password) {
    const response = await pedidosYa.loginPedidosYa(email, password);

    return response;
  }

  static async getUser(accessToken) {
    const response = await pedidosYa.myAccout(accessToken);

    return response;
  }
}

module.exports = userModel;
