const mongoose = require("mongoose");

const connectDB = () =>
  mongoose
    .connect(process.env.ATLAS_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });

module.exports = connectDB;
