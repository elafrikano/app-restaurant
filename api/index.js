const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const router = require("./routes");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(8080, () => {
  console.log("El servidor está inicializado en el puerto 8080");
});

module.exports = app;
