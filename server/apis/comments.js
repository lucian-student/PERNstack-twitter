const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const commentOwner = require('../midelware/commentOwner');

//post
//create comment
router.post('/create_comment', authorization, async (req, res) => {
    const client = await pool.connect();
    try {
        const tweet_id = req.body.tweetId;
        await client.query('BEGIN');
        const newComment =
            await client.query('INSERT INTO comments (user_id,username,tweet_id,content,num_of_likes)' +
                ' VALUES ($1,$2,$3,$4,$5) RETURNING *',
                [
                    req.user,
                    req.body.username,
                    tweet_id,
                    req.body.content,
                    0
                ]);
        const update =
            await client.query('UPDATE tweets SET num_of_comments=num_of_comments+1 WHERE tweet_id=$1',
                [
                    tweet_id
                ]);
        await client.query('COMMIT');
        res.json(newComment.rows[0]);
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});
//like comment
router.post('/like_unlike_comment', authorization, async (req, res) => {
    const client = await pool.connect();
    try {
        const id = req.body.id;
        await client.query('BEGIN');
        const checkComment =
            await client.query('SELECT like_id FROM commentlikes WHERE user_id=$1 AND comment_id=$2',
                [
                    req.user,
                    id
                ]);
        if (checkComment.rows.length === 0) {
            const newLike =
                await client.query('INSERT INTO commentlikes (user_id,comment_id)' +
                    ' VALUES ($1,$2) RETURNING *', [
                    req.user,
                    id
                ]);
            const update =
                await client.query('UPDATE comments SET num_of_likes = num_of_likes+1 WHERE comment_id=$1 RETURNING *',
                    [
                        id
                    ]);
            await client.query('COMMIT');
            res.json({
                type: 'like',
                num_of_likes: update.rows[0].num_of_likes
            });
        } else {
            const updateComment =
                await client.query('UPDATE comments SET num_of_likes=num_of_likes-1 WHERE comment_id=$1 RETURNING *',
                    [
                        id
                    ]);
            const deleteLike =
                await client.query('DELETE FROM commentlikes WHERE user_id=$1 AND comment_id=$2 RETURNING *',
                    [
                        req.user,
                        id
                    ]);
            await client.query('COMMIT');
            res.json({
                type: 'unlike',
                num_of_likes: updateComment.rows[0].num_of_likes
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
/*const setUser = async (req, res, next) => {
    try {
        req.user = 5;
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
    next();
};*/
//put
router.put('/update_comment/:id', [authorization, commentOwner], async (req, res) => {
    try {
        const id = req.params.id;
        const updatedComment =
            await pool.query('UPDATE comments SET content=$1 WHERE comment_id=$2 RETURNING *',
                [
                    req.body.content,
                    id
                ]);
        res.json(updatedComment.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//delete
router.delete('/delete_comment/:id', [authorization, commentOwner], async (req, res) => {
    const client = await pool.connect();
    try {
        const id = req.params.id;
        const tweet_id = req.body.id;
        await client.query('BEGIN');

        const deleteComment = await client.query('DELETE FROM comments WHERE comment_id=$1',
            [
                id
            ]);

        const updateTweet =
            await client.query('UPDATE tweets SET num_of_comments=num_of_comments-1 WHERE tweet_id=$1 RETURNING *',
                [
                    tweet_id
                ]);
        await client.query('COMMIT');
        res.json({
            num_of_likes: updateTweet.rows[0].num_of_likes
        });
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});

module.exports = router;