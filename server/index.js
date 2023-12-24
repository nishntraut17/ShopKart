const express = require("express");
const cors = require('cors');
const stripe = require("stripe")("sk_test_51NEub8SEzFQ88XP6F2MPAxQsgEsIbFOdpsFyZqvk1Q88VxCeYjltcNBTtyRM9LfjejCl4FBvaKfV4ySTW331YTO400EUt6pInl")
require("dotenv").config();
require("./db/conn");

const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const orderRouter = require("./routes/orders");

const app = express();
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));


app.post('/api/create-checkout-session', async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.name
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/orders/success",
        cancel_url: "http://localhost:3000",
    })
    console.log(session);

    res.json({ url: session.url });
})

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);


app.get("*", (req, res) => {
    res.send("Hello from server");
})

app.listen(port, () => {
    console.log("server connect ho gaya");
})