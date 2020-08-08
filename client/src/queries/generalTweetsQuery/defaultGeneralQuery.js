import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
export const generalQuery = async (page, setTweets) => {
    return await jwtTransport
        .get(`http://localhost:5000/tweets/${page}`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            setTweets(res.data);
        })
        .catch(err => console.error(err));
};