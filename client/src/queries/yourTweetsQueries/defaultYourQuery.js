import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
export const yourDefaultQuery = async (user_id, page, setTweets) => {
    return await jwtTransport
        .get(`http://localhost:5000/tweets/user`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                page,
                user_id
            }
        })
        .then(res => {
            setTweets(res.data);
        })
        .catch(err => console.error(err));
};

/*export const yourDefaultQuery = async (page, setTweets) => {
    return await jwtTransport.get('http://localhost:5000/tweets/get_hello', {
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        params: {
            id: 5
        }
    })
        .then(res => {
            setTweets(res.data);
        })
        .catch(err => console.error(err));
}*/