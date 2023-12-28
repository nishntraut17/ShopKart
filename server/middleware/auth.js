const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401).send(error);

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) return res.sendStatus(403);
        console.log(decoded.userId);
        req.user = decoded.userId;
        console.log(req.user);
        next();
    });
};

module.exports = auth;
