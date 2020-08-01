const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const { json } = require('express');
// to all request add Authorization midlewear after testing
//get
// get all tweets,likes,comments,comment likes + pagination by 10 tweets
// zmena, like bude jako cislo a bude mit vlastni table, ktery se nebude queriovat jenom tweety
router.get('/:page', authorization, async (req, res) => {
    try {
        const page = parseInt(req.params.page) * 10;
        const tweets = await pool.query('SELECT * FROM tweets OFFSET $1 LIMIT 10', [page]);

        res.json(tweets.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
// get tweets by username with tweets,likes,comments,comment likes

//post
//create tweet
router.post('/create_tweet', authorization, async (req, res) => {
    try {
        const newTweet =
            await pool.query('INSERT INTO tweets (user_id,content,num_of_likes,num_of_tweets)' +
                ' VALUES ($1,$2,$3,$4) RETURNING *',
                [
                    req.user,
                    req.body.data.content,
                    0,
                    0
                ]);
        res.json(newTweet.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//add like
router.post('/like_tweet/:id', authorization, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const checkTweet =
            await pool.query('SELECT like_id FROM tweetlikes WHERE user_id=$1 AND tweet_id=$2',
                [
                    req.user,
                    id
                ]);
        if (checkTweet.rows.length === 0) {

            const newLike =
                await pool.query('INSERT INTO tweetlikes (user_id,tweet_id)' +
                    ' VALUES ($1,$2) RETURNING *', [
                    req.user,
                    id
                ]);

            const update =
                await pool.query('UPDATE tweets SET num_of_likes = num_of_likes+1 WHERE tweet_id=$1',
                    [
                        id
                    ]);
            return res.json(newLike.rows[0]);
        } else {
            return res.status(404).json('u already liked that tweet');
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//put
//update tweet content
//update comment content

//delete
//delete tweet
//delete comment
//delete like of tweet
//delete like of comment

module.exports = router;