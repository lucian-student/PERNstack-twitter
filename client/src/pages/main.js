import React, { Fragment, useEffect, useContext } from 'react';
import GeneralTweets from '../components/mainPageComponents/generalTweets';
import { FilterContext } from '../context/filter';
function Main() {
    const { setRoute, route, setGeneralTweets } = useContext(FilterContext);
    useEffect(() => {
        setRoute('general');
        return () => {
            setGeneralTweets(null);
        }
    }, [setRoute, setGeneralTweets]);

    return (
        <Fragment>
            <div style={{ display: "flex" }}>
                <div style={{ margin: "auto", width: '70%' }}>
                    {route === 'general' && (
                        <GeneralTweets />
                    )}
                </div>
            </div>
        </Fragment >
    )
}

export default Main;