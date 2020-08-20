import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const likeUnlike = async (index, tweetId, tweets, setTweets) => {

    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: { id: tweetId },
        url: `http://localhost:5000/tweets/like_unlike_tweet`,
    })
        .then(res => {
            if (String(res.data.type) === 'like') {
                let tempTweets = tweets;
                tempTweets[index] = {
                    ...tweets[index],
                    num_of_likes: parseInt(tweets[index].num_of_likes) + 1
                }
                setTweets([...tempTweets]);
            } else if (String(res.data.type) === 'unlike') {

                let tempTweets = tweets;
                tempTweets[index] = {
                    ...tweets[index],
                    num_of_likes: parseInt(tweets[index].num_of_likes) - 1
                }
                setTweets([...tempTweets]);
            }
        })
        .catch(err => console.error(err));
};

export const likeUnlikeComment = async (index, commentId, comments, setComments) => {

    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: { id: commentId },
        url: `http://localhost:5000/comments/like_unlike_comment`,
    })
        .then(res => {
            if (String(res.data.type) === 'like') {
                let tempComments = comments;
                tempComments[index] = {
                    ...comments[index],
                    num_of_likes: parseInt(comments[index].num_of_likes) + 1
                };
                setComments([...tempComments]);
            } else if (String(res.data.type) === 'unlike') {
                let tempComments = comments;
                tempComments[index] = {
                    ...comments[index],
                    num_of_likes: parseInt(comments[index].num_of_likes) - 1
                };
                setComments([...tempComments]);
            }
        })
        .catch(err => console.error(err));
};