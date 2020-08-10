import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
//comments
// variables: sortValue page
export const userByComments = async (user_id,sortValue, page, setTweets) => {
    return await jwtTransport
        .get(`http://localhost:5000/tweet_queries/user_by_comments`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                sortValue,
                user_id,
                page
            }
        })
        .then(res => {
            setTweets(res.data);
        })
        .catch(err => console.error(err));
};
//likes
// variables: sortValue page
export const userByLikes = async (user_id,sortValue, page, setTweets) => {
    return await jwtTransport
        .get(`http://localhost:5000/tweet_queries/user_by_likes`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                sortValue,
                user_id,
                page
            }
        })
        .then(res => {
            setTweets(res.data);
        })
        .catch(err => console.error(err));
};