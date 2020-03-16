const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = connectDb;
