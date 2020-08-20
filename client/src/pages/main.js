import React, { Fragment, useContext } from 'react';
import { AuthContext } from '../context/auth';
import YourTweets from '../components/mainPageComponents/yourTweets';
import GeneralTweets from '../components/mainPageComponents/generalTweets';
import {
    Button
} from '@material-ui/core';
import { FilterContext } from '../context/filter';
function Main() {
    const { currentUser } = useContext(AuthContext);
    const { route, setRoute } = useContext(FilterContext);

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
                                <div>
                                    <Button style={{
                                        width: '50%',
                                        backgroundColor: '#82E0AA',
                                        fontSize: 'calc(2.5vw + 5px)'
                                    }}
                                        onClick={() => { setRoute('general') }}>
                                        All Tweets
                                    </Button>
                                    <Button style={{
                                        width: '50%',
                                        backgroundColor: '#82E0AA',
                                        fontSize: 'calc(2.5vw + 5px)'
                                    }}
                                        onClick={() => { setRoute('your') }}>
                                        Your Page
                                    </Button>
                                </div>
                                <div>
                                    {route === 'your' && (
                                        <YourTweets />
                                    )}
                                </div>
                                <div>
                                    {route === 'general' && (
                                        <div>
                                            <GeneralTweets />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </Fragment >
    )
}

export default Main;