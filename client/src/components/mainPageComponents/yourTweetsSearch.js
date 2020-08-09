import React, { useState } from 'react';
import {
    Button
} from '@material-ui/core';
import YourSearchSelect from './searchRoutes/yourSearchSelect';
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
                                    <YourSearchSelect properties={{
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