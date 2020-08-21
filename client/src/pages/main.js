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
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    {route === 'general' && (
                        <GeneralTweets />
                    )}
                </div>
            </div>
        </Fragment >
    )
}

export default Main;