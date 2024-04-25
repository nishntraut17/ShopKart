const express = require("express");
const cors = require('cors');
require("dotenv").config();
require("./db/conn");
const stripe = require("stripe")(process.env.STRIPE_KEY)

const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const orderRouter = require("./routes/orders");

const app = express();
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://shopkart-ecommerce-app.netlify.app', 'https://shopkart-ecommerce.onrender.com'],
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
        success_url: `${process.env.FRONT_END_URL}/success`,
        cancel_url: `${process.env.FRONT_END_URL}/`,
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