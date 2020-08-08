import React, { useState } from 'react';
import {
    Button
} from '@material-ui/core';
import SearchSelect from './searchRoutes/searchSelect';
import SearchForm from './searchRoutes/searchForm';

function GeneralTweetSearch() {
    const [route, setRoute] = useState('select');
    const [searching, setSearching] = useState(false);
    //select criterias than fill formular
    return (
        <div>
            {searching ? (
                <div>
                    <div>
                        <div>
                            {route === 'select' && (
                                <SearchSelect properties={{
                                    setRoute,
                                    setSearching
                                }} />
                            )}
                        </div>
                        <div>
                            {route === 'form' && (
                                <SearchForm properties={{
                                    setRoute,
                                    setSearching
                                }} />
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

export default GeneralTweetSearch;