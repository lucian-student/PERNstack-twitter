import React, { Fragment, useState, useEffect } from 'react';
import { getAcessToken } from '../utils/accessToken';
import axios from 'axios';


function Main() {
    const [userData, setUserData] = useState(null);

    // implement axios interceptors
    
    useEffect(() => {
        const reciveData = async () => {
            console.log(getAcessToken());
            return await axios.get('http://localhost:5000/tweets/', {
                headers: {
                    'Authorization': 'Bearer ' + getAcessToken(),
                    'Content-Type': 'application/json'
                }
            }).then(async (response) => {
                setUserData(response.data);
                console.log(response.data);
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