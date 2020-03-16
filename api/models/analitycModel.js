const mongoose = require("mongoose");
const analitycSchema = new mongoose.Schema({
  name: String,
  value: {
    type: Map,
    of: String
  }
});
const Analityc = mongoose.model("AnalityA", analitycSchema);

module.exports = Analityc;
