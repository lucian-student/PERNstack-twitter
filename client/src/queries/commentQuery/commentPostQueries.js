import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const createComment = async (tweetId, username, content, setComments, comments) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            username,
            content,
            tweetId
        },
        url: `http://localhost:5000/comments/create_comment`,
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
            }, ...comments]);
        })
        .catch(err => console.error(err));
};

export const deleteComment = async (tweetId, commentId, setComments, comments, tweet, setTweet) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            id: tweetId
        },
        url: `http://localhost:5000/comments/delete_comment/${commentId}`,
    })
        .then(res => {
            let tempComments = comments;
            setComments([...tempComments.filter(comment => comment.comment_id !== commentId)]);
            setTweet([{
                ...tweet[0],
                num_of_likes: res.data.num_of_likes
            }])
        })
        .catch(err => console.error(err));
};

export const editComment = async (index, commentId, content, setComments, comments) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            content
        },
        url: `http://localhost:5000/comments/update_comment/${commentId}`,
    })
        .then(res => {
            const data = res.data;
            const newComment = {
                tweet_id: data.tweet_id,
                username: data.username,
                num_of_likes: data.num_of_likes,
                content: data.content,
                comment_id: data.comment_id,
                user_id: data.user_id
            };
            let tempComments = comments;
            tempComments[index] = newComment;
            setComments([...tempComments]);
        })
        .catch(err => console.error(err));
};