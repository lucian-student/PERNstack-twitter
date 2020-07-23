const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try{
        const accessToken = req.header('token');
        if(!accessToken){
            return res.status(403).json('You are not authorized!');
        }
        // handle refresh of token
        const payload = jwt.verify(accessToken,process.env.SECRET1);
        req.user = payload.user;
    }catch(err){
        console.log(err.message);
        return res.status(403).json('You are not authorized!');
    }
    next();
};