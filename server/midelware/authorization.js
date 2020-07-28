const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    const authorization = req.headers['authorization'];

    if (!authorization) {
        return res.status(403).json('Not Authorized!');
    }

    try {
        const accessToken = authorization.split(' ')[1];
        const { user } = jwt.verify(accessToken, process.env.SECRET1);


        req.user = user;
    } catch (err) {
        return res.status(403).json('Not Authorized!');
    }


    next();
};