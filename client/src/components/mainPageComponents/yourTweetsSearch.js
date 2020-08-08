import React, { useState } from 'react';
import {
    Button
} from '@material-ui/core';
import YourTweetSelect from './searchRoutes/yourSearchSelect';
import YourTweetForm from './searchRoutes/yourSearchForm';
import YourSearchForm from './searchRoutes/yourSearchForm';
function YourTweetSearch() {
    const [route, setRoute] = useState('select');
    const [searching, setSearching] = useState(false);
    return (
        <div>
            {searching ? (
                <div>
                    <div>
                        <div>
                            {route === 'select' && (
                                <div>
                                    <YourTweetSelect properties={{
                                        setRoute,
                                        setSearching
                                    }} />
                                </div>
                            )}
                        </div>
                        <div>
                            {route === 'form' && (
                                <div>
                                    <YourSearchForm properties={{
                                        setRoute,
                                        setSearching
                                    }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                    <Button className='filterButton'
                        onClick={() => { setSearching(true) }}>
                        Filter
                    </Button>
                )}

        </div>
    )
}

export default YourTweetSearch;