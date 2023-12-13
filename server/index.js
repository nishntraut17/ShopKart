const express = require("express");
const cors = require('cors');
require("dotenv").config();
require("./db/conn");

const userRouter = require('./routes/users');
const productRouter = require('./routes/products');

const app = express();
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);


app.get("*", (req, res) => {
    res.send("Hello from server");
})

app.listen(port, () => {
    console.log("server connect ho gaya");
})