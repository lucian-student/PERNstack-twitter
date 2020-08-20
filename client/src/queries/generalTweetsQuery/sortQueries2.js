import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import { setHelper } from '../../utils/paginationHelper';
// username and comments
// variables: page sortValue username
export const usernameAndComments = async (username,sortValue, page, setTweets) => {
    return await jwtTransport
        .get(`http://localhost:5000/tweet_queries/username_and_comments`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                sortValue,
                username,
                page
            }
        })
        .then(res => {
            setHelper(res.data.length);
            setTweets(res.data);
        })
        .catch(err => console.error(err));
};

// username and likes
// variables: page sortValue username

export const usernameAndLikes = async (username,sortValue, page, setTweets) => {
    return await jwtTransport
        .get(`http://localhost:5000/tweet_queries/username_and_likes`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                sortValue,
                username,
                page
            }
        })
        .then(res => {
            setHelper(res.data.length);
            setTweets(res.data);
        })
        .catch(err => console.error(err));
};