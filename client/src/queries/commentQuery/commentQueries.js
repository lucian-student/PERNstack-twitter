import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import { setHelper } from '../../utils/paginationHelper';
// general query
export const commentsQuery = async (tweet_id, page, setTweet, setComments) => {
    return await jwtTransport
        .get(`http://localhost:5000/comment_queries/comments`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                tweet_id,
                page
            }
        })
        .then(res => {
            setHelper(res.data.length);
            let count = 0;
            let comments = [];
            res.data.reverse().forEach(data => {
                if (count === 0) {
                    setTweet([{
                        tweet_id: data.tweet_id,
                        username: data.username,
                        num_of_comments: data.num_of_comments,
                        num_of_likes: data.num_of_likes,
                        content: data.content,
                        user_id: data.user_id
                    }]);
                }
                if (data.comment_id) {
                    comments.unshift({
                        tweet_id: data.tweet_id,
                        username: data.comment_username,
                        num_of_likes: data.comment_likes,
                        content: data.comment_content,
                        comment_id: data.comment_id,
                        user_id: data.comment_user_id
                    });
                }
                count++;
            });
            setComments(comments);
        })
        .catch(err => console.error(err));
};
// query by likes
export const sortByLikes = async (sortValue, tweet_id, page, setTweet, setComments) => {
    return await jwtTransport
        .get(`http://localhost:5000/comment_queries/comments_by_likes`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                tweet_id,
                sortValue,
                page
            }
        })
        .then(res => {
            setHelper(res.data.length);
            let count = 0;
            let comments = [];
            res.data.reverse().forEach(data => {
                if (count === 0) {
                    setTweet([{
                        tweet_id: data.tweet_id,
                        username: data.username,
                        num_of_comments: data.num_of_comments,
                        num_of_likes: data.num_of_likes,
                        content: data.content,
                        user_id: data.user_id
                    }]);
                }
                if (data.comment_id) {
                    comments.push({
                        tweet_id: data.tweet_id,
                        username: data.comment_username,
                        num_of_likes: data.comment_likes,
                        content: data.comment_content,
                        comment_id: data.comment_id,
                        user_id: data.comment_user_id
                    });
                }
                count++;
            });
            setComments(comments);
        })
        .catch(err => console.error(err));
};