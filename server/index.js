const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const login = require("./routes/loginRoutes");

dotenv.config({ path: "./.env" });

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.ATLAS_URI).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection error:", err);
});


// Routes
app.use("/", login);


// Starting the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
