import React, { Fragment, useState, useEffect } from 'react';
import { getAcessToken } from '../utils/accessToken';
import { jwtTransport } from '../axios/refreshTokenAxios';


function Main() {
    const [userData, setUserData] = useState(null);

    // implement axios interceptors

    useEffect(() => {
        const reciveData = async () => {
            return await jwtTransport.get('http://localhost:5000/tweets/', {
                headers: {
                    'Authorization': 'Bearer ' + getAcessToken(),
                    'Content-Type': 'application/json'
                }
            }).then(async (response) => {
                setUserData(response.data);
            }).catch(err => {
                console.log(err.message);
            });
        };

        reciveData();

    }, []);

    return (
        <Fragment>
            <div style={{ display: "flex" }}>
                <div style={{ margin: "auto", width: '70%' }}>
                    {!userData ? (
                        <div>
                            Loading ...
                        </div>
                    ) : (
                            <div>
                                {userData}
                            </div>
                        )}
                </div>
            </div>
        </Fragment>
    )
}

export default Main;