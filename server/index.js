const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/mongoose");
const loginRoutes = require("./routes/loginRoutes");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();




// Routes
app.use("/", loginRoutes);


// Starting the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
