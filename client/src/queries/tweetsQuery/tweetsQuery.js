import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const createTweet = async (content, username, setTweets, tweets) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            content,
            username
        },
        url: `http://localhost:5000/tweets/create_tweet`,
    })
        .then(res => {
            let tempTweets = tweets;
            tempTweets.unshift(res.data);
            setTweets([...tempTweets]);
        })
        .catch(err => console.error(err));
};

export const deleteTweet = async (tweetId, setTweets, tweets) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        url: `http://localhost:5000/tweets/delete_tweet/${tweetId}`,
    })
        .then(res => {
            setTweets([...tweets.filter(tweet => tweet.tweet_id !== tweetId)])
        })
        .catch(err => console.error(err));
};

export const editTweet = async (index, tweetId, content, setTweets, tweets) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            content
        },
        url: `http://localhost:5000/tweets/update_tweet/${tweetId}`,
    })
        .then(res => {
            let tempTweets = tweets;
            tempTweets[index] = res.data;
            setTweets([...tempTweets]);
        })
        .catch(err => console.error(err));
};

