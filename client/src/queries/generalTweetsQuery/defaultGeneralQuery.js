import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import { setHelper } from '../../utils/paginationHelper';
export const generalQuery = async (page, setTweets) => {
    return await jwtTransport
        .get(`http://localhost:5000/tweets/general/${page}`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            setHelper(res.data.length);
            setTweets(res.data);
        })
        .catch(err => console.error(err));
};