const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const { route } = require('./tweets');

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
    try {
        const id = req.params.id;
        const newComment =
            await pool.query('INSERT INTO comments (user_id,tweet_id,content,num_of_likes)' +
                ' VALUES ($1,$2,$3,$4) RETURNING *',
                [
                    req.user,
                    id,
                    req.body.data.content,
                    0
                ]);
        res.json(newComment.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//like comment
router.post('/like_comment/:id', authorization, async (req, res) => {
    const client = await pool.connect();
    try {
        const id = req.params.id;
        //begin transaction
        await client.query('BEGIN');
        // transaction logic
        const checkComment =
            await client.query('SELECT like_id FROM commentlikes WHERE user_id=$1 AND comment_id=$2',
                [
                    req.user,
                    id
                ]);
        if (checkComment.rows.length === 0) {
            // insert
            const newLike =
                await client.query('INSERT INTO commentlikes (user_id,comment_id)' +
                    ' VALUES ($1,$2) RETURNING *', [
                    req.user,
                    id
                ]);
            // update
            const update =
                await client.query('UPDATE comments SET num_of_likes = num_of_likes+1 WHERE comment_id=$1',
                    [
                        id
                    ]);
            await client.query('COMMIT');
            return res.json(newLike.rows[0]);
        } else {
            await client.query('COMMIT');
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

//delete


module.exports = router;