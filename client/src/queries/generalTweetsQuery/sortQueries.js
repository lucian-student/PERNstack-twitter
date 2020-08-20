import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import { setHelper } from '../../utils/paginationHelper';
// tweet_queries
// tweets by likes
// variables: sortValue and page
export const sortByLikes = async (sortValue, page, setTweets) => {
    return await jwtTransport
        .get(`http://localhost:5000/tweet_queries/sort_by_likes`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                sortValue,
                page
            }
        })
        .then(res => {
            setHelper(res.data.length);
            setTweets(res.data);
        })
        .catch(err => console.error(err));
};
// tweets by comments
// variables: sortValue and page
export const sortByComments = async (sortValue, page, setTweets) => {
    return await jwtTransport
        .get(`http://localhost:5000/tweet_queries/sort_by_comments`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                sortValue,
                page
            }
        })
        .then(res => {
            setHelper(res.data.length);
            setTweets(res.data);           
        })
        .catch(err => console.error(err));
};

// tweets by username
// variables: username and page
export const searchByUsername = async (username, page, setTweets) => {
    return await jwtTransport
        .get(`http://localhost:5000/tweet_queries/search_by_username`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
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
