const express = require('express');
const router = express.Router();
const pool = require('../configuration/db');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwtGenerator');
const authorization = require('../midelware/authorization');
const validation = require('../midelware/validation');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//user calls

//get 
router.get("/", async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json(users.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
// post 
router.post('/register/', validation, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userCheck = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if (userCheck.rows.length === 0) {
            // password hash
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password, salt);
            //end of password hash
            const newUser = await pool.query
                ('INSERT INTO users (name,email,password,online) VALUES ($1,$2,$3,$4) RETURNING *',
                    [name, email, bcryptPassword, true]
                );
            //token handelingew
            const accesToken = generateAccessToken(newUser.rows[0].user_id);
            //refresh token insert to database
            const refreshToken = generateRefreshToken(newUser.rows[0].user_id);
            const newRefreshToken = await pool.query
                ('INSERT INTO refreshTokens (user_id,token) VALUES ($1,$2) RETURNING *',
                    [newUser.rows[0].user_id, refreshToken]);
            const currentRefreshToken = newRefreshToken.rows[0].token;
            res.json({ accesToken, refreshToken: currentRefreshToken });
        } else {
            res.status(401).json('User Exists');
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login/', validation, async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCheck = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if (userCheck.rows.length === 1) {

            const validPassword = await bcrypt.compare(password, userCheck.rows[0].password);
            if (validPassword) {
                // token handeling
                const accesToken = generateAccessToken(userCheck.rows[0].user_id);
                let currentRefreshToken;
                //check if refresh token exists 
                const checkToken = await pool.query('SELECT * FROM refreshTokens WHERE user_id=$1', [userCheck.rows[0].user_id]);
                if (checkToken.rows.length === 0) {
                    //refresh token insert to database
                    const refreshToken = generateRefreshToken(userCheck.rows[0].user_id);
                    const newRefreshToken = await pool.query
                        ('INSERT INTO refreshTokens (user_id,token) VALUES ($1,$2)',
                            [userCheck.rows[0].user_id, refreshToken]);
                    currentRefreshToken = refreshToken;
                } else {
                    jwt.verify(checkToken.rows[0].token, process.env.SECRET2, async (err, user) => {
                        if (err) {
                            //delete previous one 
                            const deleteToken = await pool.query('DELETE FROM refreshTokens WHERE user_id=$1',
                                [userCheck.rows[0].user_id]);
                            //refresh token insert to database
                            const refreshToken = generateRefreshToken(userCheck.rows[0].user_id);
                            const newRefreshToken = await pool.query
                                ('INSERT INTO refreshTokens (user_id,token) VALUES ($1,$2)',
                                    [userCheck.rows[0].user_id, refreshToken]);
                            currentRefreshToken = refreshToken;
                        } else {
                            currentRefreshToken = checkToken.rows[0].token;
                        }
                    });
                }
                res.json({ accesToken, refreshToken: currentRefreshToken });
            } else {
                return res.status(401).send('Password doesnt match!');
            }
        } else {
            res.status(401).json('Somthing went wrong!');
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})
//put

//delete
// needs rework:3
router.delete('/logout/:id', authorization, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const logout = await pool.query('DELETE FROM refreshTokens WHERE user_id=$1', [userId]);
        res.status(200).json('You logged out!');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;