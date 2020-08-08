const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const commentOwner = require('../midelware/commentOwner');
//get 
// get comments of certain tweet
router.get('/:id', authorization, async (req, res) => {
    try {
        const id = req.params.id;
        const comments = await pool.query('SELECT * FROM comments WHERE tweet_id=$1', [id]);

        res.json(comments.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//post
//create comment
router.post('/create_comment/:id', authorization, async (req, res) => {
    const client = await pool.connect();
    try {
        const id = req.params.id;
        const tweet_id = req.body.data.id;
        await client.query('BEGIN');
        const newComment =
            await client.query('INSERT INTO comments (user_id,tweet_id,content,num_of_likes)' +
                ' VALUES ($1,$2,$3,$4) RETURNING *',
                [
                    req.user,
                    id,
                    req.body.data.content,
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
router.post('/like_comment/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        const id = req.params.id;
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
                await client.query('UPDATE comments SET num_of_likes = num_of_likes+1 WHERE comment_id=$1',
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
                    req.body.data.content,
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
            comment_id: id,
            tweet_id: tweet_id
        });
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});
router.delete('/delete_like/:id', authorization, async (req, res) => {
    const client = await pool.connect();
    try {
        const id = parseInt(req.params.id);
        await client.query('BEGIN');

        const checkLike =
            await client.query('SELECT * FROM commentlikes WHERE user_id=$1 AND comment_id=$2',
                [
                    req.user,
                    id
                ]);
        if (checkLike.rows.length === 1) {
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
                comment_id: id,
                like_id: deleteLike.rows[0].like_id
            });
        } else {
            await client.query('ROLLBACK');
            return res.status(403).json('Not Authorized!')
        }
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});


module.exports = router;