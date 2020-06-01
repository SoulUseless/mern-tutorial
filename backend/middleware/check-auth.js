const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    //just allow OPTIONS (sent before POST request is sent) through
    if (req.method === "OPTIONS") {
        return next();
    }
    //token is encoded in headers, authorization
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error ("Authentication failed");
        }
        //have token -> verify token -> jwt.verify returns a string value after decryption
        //contains payload before encryption
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        //appending user data to the request to be passed on
        req.userData = { userId: decodedToken.userId };
        next();

    } catch (err) { //catches when string.split fails
        const error = new HttpError("Authentication failed", 403);
        next(error);
        return;
    }


}