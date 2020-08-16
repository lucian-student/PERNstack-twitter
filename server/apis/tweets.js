const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const tweetOwner = require('../midelware/tweetOwner');
// to all request add Authorization midlewear after testing
//get
// get all tweets,likes,comments,comment likes + pagination by 10 tweets
// zmena, like bude jako cislo a bude mit vlastni table, ktery se nebude queriovat jenom tweety
router.get('/general/:page', authorization, async (req, res) => {
    try {
        const page = parseInt(req.params.page) * 10;
        const tweets = await pool.query('SELECT * FROM tweets OFFSET $1 LIMIT 10', [page]);

        res.json(tweets.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
// get tweets by username with tweets,likes,comments,comment 
router.get('/user', authorization, async (req, res) => {
    try {
        const page = parseInt(req.query.page) * 10;
        const tweets = await pool.query('SELECT * FROM tweets WHERE user_id=$1 OFFSET $2 LIMIT 10', [req.query.user_id, page]);
        res.json(tweets.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//post
router.post('/create_tweet', authorization, async (req, res) => {
    try {
        const newTweet =
            await pool.query('INSERT INTO tweets (user_id,username,content,num_of_likes,num_of_comments)' +
                ' VALUES ($1,$2,$3,$4) RETURNING *',
                [
                    req.user,
                    req.body.username,
                    req.body.content,
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

router.post('/like_unlike_tweet', authorization, async (req, res) => {
    const client = await pool.connect();
    try {
        const id = parseInt(req.body.id);
        await client.query('BEGIN');
        const checkTweet =
            await client.query('SELECT like_id FROM tweetlikes WHERE user_id=$1 AND tweet_id=$2',
                [
                    req.user,
                    id
                ]);
        if (checkTweet.rows.length === 0) {
            const newLike =
                await client.query('INSERT INTO tweetlikes (user_id,tweet_id)' +
                    ' VALUES ($1,$2) RETURNING *', [
                    req.user,
                    id
                ]);
            const update =
                await client.query('UPDATE tweets SET num_of_likes = num_of_likes+1 WHERE tweet_id=$1 RETURNING *',
                    [
                        id
                    ]);
            await client.query('COMMIT');
            console.log()
            res.json({
                type: 'like',
                num_of_likes: update.rows[0].num_of_likes
            });
        } else {
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
            // const updateTweetRes = updateTweet.rows[0];
            res.json({
                type: 'unlike',
                num_of_likes: updateTweet.rows[0].num_of_likes,
            });
        }

    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});



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
module.exports = router;