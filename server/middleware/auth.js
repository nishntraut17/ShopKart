const jwt = require('jsonwebtoken');

const auth = (req, res) => {
    try {
        const token = req.header.authorization.split(" ")[1];
        const verifyToken = jwt.verify(token, process.env.JWT_TOKEN);
        if (!verifyToken) {
            return res.status(401).send("Token error");
        }
        res.locals = verifyToken.userId;
        next();
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.export = auth; 