const express = require("express")
require("dotenv").config();
require("./db/conn");

const userRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

app.use('/api/user', userRouter);

// app.post('/register', register);

// app.get("*", (req, res) => {
//     res.send("Hello from server");
// })

app.listen(port, () => {
    console.log("server connect ho gaya");
})