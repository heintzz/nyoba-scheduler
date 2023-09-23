const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");

const cronScheduler = require("./config/cronScheduler");

connectDB();
cronScheduler();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/income", require("./routes/income.controller"));

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
