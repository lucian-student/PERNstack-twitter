import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const createComment = async (tweetId, username, content, setComments, comments) => {
    return await jwtTransport
        .post(`http://localhost:5000/comments/create_comment`, {
            data:
            {
                id: tweetId,
                username,
                content
            },
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const data = res.data;
            setComments([{
                tweet_id: data.tweet_id,
                username: data.username,
                num_of_likes: data.num_of_likes,
                content: data.content,
                comment_id: data.comment_id,
                user_id: data.user_id
            }, ...comments].reverse());
        })
        .catch(err => console.error(err));
};