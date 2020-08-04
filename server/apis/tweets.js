const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const tweetOwner = require('../midelware/tweetOwner');
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
            await pool.query('INSERT INTO tweets (user_id,content,num_of_likes,num_of_comments)' +
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
    const client = await pool.connect();
    try {
        const id = parseInt(req.params.id);
        // begin transaction
        await client.query('BEGIN');
        // query
        const checkTweet =
            await client.query('SELECT like_id FROM tweetlikes WHERE user_id=$1 AND tweet_id=$2',
                [
                    req.user,
                    id
                ]);
        if (checkTweet.rows.length === 0) {
            // insert
            const newLike =
                await client.query('INSERT INTO tweetlikes (user_id,tweet_id)' +
                    ' VALUES ($1,$2) RETURNING *', [
                    req.user,
                    id
                ]);
            // update
            const update =
                await client.query('UPDATE tweets SET num_of_likes = num_of_likes+1 WHERE tweet_id=$1',
                    [
                        id
                    ]);
            await client.query('COMMIT');
            return res.json(newLike.rows[0]);
        } else {
            await client.query('ROLLBACK');
            return res.status(404).json('u already liked that tweet');
        }
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});
//put
//update tweet content
/*const setUser = async (req, res, next) => {
    try {
        req.user = 5;
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
    next();
};*/
router.put('/update_tweet/:id', [authorization, tweetOwner], async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedTweet =
            await pool.query('UPDATE tweets SET content=$1 WHERE tweet_id=$2 RETURNING *',
                [
                    req.body.content,
                    id
                ]);
        res.json(updatedTweet.rows[0]);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//delete
//delete tweet
router.delete('/delete_tweet/:id', [authorization, tweetOwner], async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const deleteTweet =
            await pool.query('DELETE FROM tweets WHERE tweet_id=$1',
                [
                    id
                ]);
        res.json(deleteTweet.rows[0]);
    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//delete like of 
router.delete('/delete_like/:id', authorization, async (req, res) => {
    const client = await pool.connect();
    try {
        const id = req.params.id;
        await client.query('BEGIN');
        const checkLike =
            await client.query('SELECT * FROM tweetlikes WHERE tweet_id=$1 AND user_id=$2',
                [
                    id,
                    req.user
                ]);
        if (checkLike.rows.length === 1) {
            const deleteLike =
                await client.query('DELETE FROM tweetlikes WHERE tweet_id=$1 AND user_id=$2 RETURNING *',
                    [
                        id,
                        req.user
                    ]);
            const updateTweet =
                await client.query('UPDATE tweets SET num_of_likes=num_of_likes-1 WHERE tweet_id=$1 RETURNING *',
                    [
                        id
                    ]);
            await client.query('COMMIT');
            const updateTweetRes = updateTweet.rows[0];
            const deleteLikeRes = deleteLike.rows[0];
            res.json({
                tweet_id: updateTweetRes.tweet_id,
                num_of_likes: updateTweetRes.num_of_likes,
                like_id: deleteLikeRes.like_id
            });
        } else {
            await client.query('ROLLBACK');
            return res.status(403).json('Not Authorized!');
        }
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;