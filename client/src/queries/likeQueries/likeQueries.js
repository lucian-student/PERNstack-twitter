import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const likeUnlike = async (tweetId, tweets, setTweets) => {
    return await jwtTransport
        .post(`http://localhost:5000/tweets/like_unlike_tweet`, {
            data: {
                id: tweetId
            },
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            }
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