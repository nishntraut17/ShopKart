const express = require("express")
require("dotenv").config();
require("./db/conn");

const app = express();
const port = 5000;

app.get("*", (req, res) => {
    res.send("Hello from server");
})

app.listen(port, () => {
    console.log("server connect ho gaya");
})