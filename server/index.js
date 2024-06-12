const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./.env"});
const app = express();

app.use(express.json());
app.use(cors());


app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});