import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const likeUnlike = async (tweetId, tweets, setTweets) => {

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
            const tempTweets = [];
            if (String(res.data.type) === 'like') {
                tweets.forEach(tweet => {
                    if (tweetId === tweet.tweet_id) {
                        tempTweets.push({
                            ...tweet,
                            num_of_likes: res.data.num_of_likes
                        });
                    } else {
                        tempTweets.push(tweet);
                    }

                });
                setTweets(tempTweets);
            } else if (String(res.data.type) === 'unlike') {
                tweets.forEach(tweet => {
                    if (tweetId === tweet.tweet_id) {
                        tempTweets.push({
                            ...tweet,
                            num_of_likes: res.data.num_of_likes
                        });
                    } else {
                        tempTweets.push(tweet);
                    }

                });
                setTweets(tempTweets);
            }
        })
        .catch(err => console.error(err));
};

export const likeUnlikeComment = async (commentId, comments, setComments) => {

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
            const tempComments = [];
            if (String(res.data.type) === 'like') {
                comments.forEach(comment => {
                    if (commentId === comment.comment_id) {
                        tempComments.push({
                            ...comment,
                            num_of_likes: res.data.num_of_likes
                        });
                    } else {
                        tempComments.push(comment);
                    }

                });
                setComments(tempComments);
            } else if (String(res.data.type) === 'unlike') {
                comments.forEach(comment => {
                    if (commentId === comment.comment_id) {
                        tempComments.push({
                            ...comment,
                            num_of_likes: res.data.num_of_likes
                        });
                    } else {
                        tempComments.push(comment);
                    }
                });
                setComments(tempComments);
            }
        })
        .catch(err => console.error(err));
};