const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../configuration/db');
const { generateAccessToken } = require('../utils/jwtGenerator');
require('dotenv').config();
//get

//post
router.post('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const checkRefreshToken = await pool.query('SELECT * FROM refreshTokens WHERE user_id=$1', [userId]);
        if (checkRefreshToken.rows.length === 1) {
            jwt.verify(checkRefreshToken.rows[0].token, process.env.SECRET2, (err, user) => {
                if (err) return res.status(403).json('Not Authorized!');
                const accessToken = generateAccessToken(userId);
                res.json({ accessToken, refreshToken: checkRefreshToken.rows[0].token });
            });
        } else {
            return res.status(403).json('Not Authorized!');
        }
    } catch (err) {
        console.log(err.message);
        res.status(403).json('Not Authorized!');
    }
});

//put

//delete



module.exports = router;