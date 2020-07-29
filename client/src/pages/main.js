import React, { Fragment, useContext } from 'react';
import {AuthContext} from '../context/auth';
function Main() {
    const {currentUser} = useContext(AuthContext);
    return (
        <Fragment>
            <div style={{ display: "flex" }}>
                <div style={{ margin: "auto", width: '70%' }}>
                    {!currentUser ? (
                        <div>
                            Loading ...
                        </div>
                    ) : (
                            <div>
                                {currentUser.name}
                            </div>
                        )}
                </div>
            </div>
        </Fragment>
    )
}

export default Main;