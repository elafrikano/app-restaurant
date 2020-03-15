const pedidosYaService = require("../services/pedidosYaService");

const pedidosYa = new pedidosYaService();

class restaurantModel {
  static async searchRestaurants(authorization, params) {
    const data = {
      auth: {
        accessToken: authorization
      },
      user: {
        country: params.country
      },
      geo: {
        latitude: params.latitude,
        longitude: params.longitude
      },
      max: params.max || 0,
      offset: params.offset || 0
    };
    const response = await pedidosYa.searchRestaurants(data);

    if (response.isAxiosError) {
      console.log(response);
    }

    return response;
  }
}

module.exports = restaurantModel;
