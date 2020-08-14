const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');


//comments of tweet no sort
router.get('/comments', authorization, async (req, res) => {
    try {
        const tweet_id = req.query.tweet_id;
        const page = req.query.page * 10;
        const comments =
            await pool.query('WITH tweets AS (SELECT * FROM tweets WHERE tweet_id=$1),' +
                'comments AS (SELECT * FROM comments WHERE tweet_id=$1 OFFSET $2 LIMIT 10)' +
                ' SELECT tweets.tweet_id,tweets.username,comments.username as comment_username,' +
                'tweets.num_of_comments,tweets.num_of_likes,comments.num_of_likes as comment_likes,' +
                'tweets.content,comments.content as comment_content,comments.comment_id,comments.user_id as comment_user_id,' +
                'tweets.user_id ' +
                'FROM tweets LEFT JOIN comments ON tweets.tweet_id=comments.tweet_id;',
                [
                tweet_id,
                page
                ]);
        res.json(comments.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//comments by likes
router.get('/comments_by_likes', authorization, async (req, res) => {
    try {
        const tweet_id = req.query.tweet_id;
        const page = req.query.page * 10;
        const sortValue = req.query.sortValue;
        const comments =
            await pool.query('WITH tweets AS (SELECT * FROM tweets WHERE tweet_id=$1),' +
                'vars as (SELECT $2::boolean as sort_value),' +
                'comments AS (SELECT * FROM comments WHERE tweet_id=$1' +
                ' ORDER BY (SELECT sort_value FROM vars)' +
                ', case when (SELECT sort_value FROM vars) then num_of_likes end desc' +
                ', case when not (SELECT sort_value FROM vars) then num_of_likes end asc' +
                ' OFFSET $3 LIMIT 10)' +
                ' SELECT tweets.tweet_id,tweets.username,comments.username as comment_username,' +
                'tweets.num_of_comments,tweets.num_of_likes,comments.num_of_likes as comment_likes,' +
                'tweets.content,comments.content as comment_content,comments.comment_id,comments.user_id as comment_user_id,' +
                'tweets.user_id' +
                ' FROM tweets LEFT JOIN comments ON tweets.tweet_id=comments.tweet_id;',
                [
                tweet_id,
                sortValue,
                page
                ]);
        res.json(comments.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;