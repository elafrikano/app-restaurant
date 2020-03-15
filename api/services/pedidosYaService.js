const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

class pedidosYaService {
  constructor() {
    this.clientId = process.env.CLIENT_ID || "";
    this.clientSecret = process.env.CLIENT_SECRET || "";
    this.baseUrl = process.env.BASE_URL || "";
    this.method = "GET";
  }

  async getGuestToken() {
    try {
      let response = await axios({
        method: this.method,
        url:
          this.baseUrl +
          `tokens?clientId=${this.clientId}&clientSecret=${this.clientSecret}`,
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) return response.data.access_token;
    } catch (error) {
      return "getGuestToken: " + error;
    }
  }

  async loginPedidosYa(username, password) {
    try {
      const token = await this.getGuestToken();
      let response = await axios({
        method: this.method,
        url: this.baseUrl + `tokens?userName=${username}&password=${password}`,
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) return response.data;
    } catch (error) {
      if (error.response) {
        // error.response.data
        // error.response.status
        // error.response.headers
        return error.response;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    }
  }

  async myAccout(accessToken) {
    try {
      let response = await axios({
        method: this.method,
        url: this.baseUrl + "myAccount",
        headers: {
          Authorization: accessToken
        }
      });
      if (response.status === 200) return response.data;
    } catch (error) {
      return error.response;
    }
  }

  async searchRestaurants(data) {
    let queryParams = `?country=${data.user.country}&point=${data.geo.latitude},${data.geo.longitude}&`;

    if (data.max) {
      queryParams += `max=${data.max}&`;
    }

    if (data.offset) {
      queryParams += `offset=${data.offset}`;
    }

    try {
      let response = await axios({
        method: this.method,
        url: this.baseUrl + "search/restaurants" + queryParams,
        headers: {
          Authorization: data.auth.accessToken
        }
      });
      if (response.status === 200) return response.data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = pedidosYaService;
