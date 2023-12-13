const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const client = mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB Connected");
}).catch((error) => {
    console.log("Error: error");
    return error;
});

module.exports = client;