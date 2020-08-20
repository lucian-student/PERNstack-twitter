import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import { setHelper } from '../../utils/paginationHelper';
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
            setHelper(res.data.length);
            setTweets(res.data);
        })
        .catch(err => console.error(err));
};

