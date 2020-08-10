const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');

// tweets by likes
// doesnt work need to make that working
router.get('/sort_by_likes', authorization, async (req, res) => {
    try {
        const page = parseInt(req.query.page) * 10;
        const sortValue = req.query.sortValue;
        const tweets =
            await pool.query('WITH vars as (SELECT $1::boolean as sort_value)' +
                ' SELECT * FROM tweets ORDER BY (SELECT sort_value FROM vars)' +
                ', case when (SELECT sort_value FROM vars) then num_of_likes end desc' +
                ', case when (SELECT sort_value FROM vars) then num_of_likes end asc' +
                ' OFFSET $2 LIMIT 10',
                [
                    sortValue,
                    page
                ]);
        res.json(tweets.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/sort_by_comments', authorization, async (req, res) => {
    try {
        const page = parseInt(req.query.page) * 10;
        const sortValue = req.query.sortValue;
        const tweets =
            await pool.query('WITH vars as (SELECT $1::boolean as sort_value)' +
                ' SELECT * FROM tweets ORDER BY (SELECT sort_value FROM vars)' +
                ', case when (SELECT sort_value FROM vars) then num_of_comments end desc' +
                ', case when (SELECT sort_value FROM vars) then num_of_comments end asc' +
                ' OFFSET $2 LIMIT 10',
                [
                    sortValue,
                    page
                ]);
        res.json(tweets.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
// finished
router.get('/search_by_username', authorization, async (req, res) => {
    try {
        const page = parseInt(req.query.page) * 10;
        const username = req.query.username;
        const tweets =
            await pool.query('SELECT * FROM tweets WHERE username=$1 OFFSET $2 LIMIT 10',
                [
                    username,
                    page
                ]);
        res.json(tweets.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//'SELECT * FROM tweets WHERE username=$1 ORDER BY num_of_comments desc OFFSET $2 LIMIT 10'
router.get('/username_and_comments', authorization, async (req, res) => {
    try {
        const page = req.query.page * 10;
        const username = req.query.username;
        const sortValue = req.query.sortValue;
        const tweets =
            await pool.query('WITH vars as (SELECT $1::boolean as sort_value)' +
            ' SELECT * FROM tweets WHERE username=$2 ORDER BY (SELECT sort_value FROM vars)' +
            ', case when (SELECT sort_value FROM vars) then num_of_comments end desc' +
            ', case when (SELECT sort_value FROM vars) then num_of_comments end asc' +
            ' OFFSET $3 LIMIT 10',
                [
                    sortValue,
                    username,
                    page
                ]);
        res.json(tweets.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/username_and_likes', authorization, async (req, res) => {
    try {
        const page = req.query.page * 10;
        const username = req.query.username;
        const sortValue = req.query.sortValue;
        const tweets =
            await pool.query('WITH vars as (SELECT $1::boolean as sort_value)' +
            ' SELECT * FROM tweets WHERE username=$2 ORDER BY (SELECT sort_value FROM vars)' +
            ', case when (SELECT sort_value FROM vars) then num_of_likes end desc' +
            ', case when (SELECT sort_value FROM vars) then num_of_likes end asc' +
            ' OFFSET $3 LIMIT 10',
                [
                    sortValue,
                    username,
                    page
                ]);
        res.json(tweets.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//'SELECT * FROM tweets WHERE user_id=$1 ORDER BY num_of_comments desc OFFSET $2 LIMIT 10'
router.get('/user_by_comments', authorization, async (req, res) => {
    try {
        const page = req.query.page * 10;
        const user_id = req.query.user_id;
        const sortValue = req.query.sortValue;
        const tweets =
            await pool.query('WITH vars as (SELECT $1::boolean as sort_value)' +
            ' SELECT * FROM tweets WHERE user_id=$2 ORDER BY (SELECT sort_value FROM vars)' +
            ', case when (SELECT sort_value FROM vars) then num_of_comments end desc' +
            ', case when (SELECT sort_value FROM vars) then num_of_comments end asc' +
            ' OFFSET $3 LIMIT 10',
                [
                    sortValue,
                    user_id,
                    page
                ]);
        res.json(tweets.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
router.get('/user_by_likes', async (req, res) => {
    try {
        const page = req.query.page * 10;
        const user_id = req.query.user_id;
        const sortValue = req.query.sortValue;
        const tweets =
            await pool.query('WITH vars as (SELECT $1::boolean as sort_value)' +
            ' SELECT * FROM tweets WHERE user_id=$2 ORDER BY (SELECT sort_value FROM vars)' +
            ', case when (SELECT sort_value FROM vars) then num_of_likes end desc' +
            ', case when (SELECT sort_value FROM vars) then num_of_likes end asc' +
            ' OFFSET $3 LIMIT 10',
                [
                    user_id,
                    page
                ]);
        res.json(tweets.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router;