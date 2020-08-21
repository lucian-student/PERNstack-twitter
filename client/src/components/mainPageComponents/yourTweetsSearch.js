import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import YourSearchSelect from './searchRoutes/yourSearchSelect';
import YourSearchForm from './searchRoutes/yourSearchForm';
import { FilterContext } from '../../context/filter';
function YourTweetSearch() {
    const [route, setRoute] = useState('select');
    const [searching, setSearching] = useState(false);
    const { yourQueryValues: { query }, setYourQueryValues } = useContext(FilterContext);
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
                    <div>
                        {query !== 'general' ? (
                            <div>
                                <Button className='filterButton2'
                                    style={{ fontSize: 'calc(1.5vw + 5px)' }}
                                    onClick={() => { setSearching(true) }}>
                                    Filter
                                </Button>
                                <Button className='filterButton2'
                                    style={{ fontSize: 'calc(1.5vw + 5px)' }}
                                    onClick={() => {
                                        setYourQueryValues({
                                            query: 'general',
                                            page: 0,
                                            sortValue: null
                                        });
                                    }}>
                                    No Filters
                                </Button>
                            </div>
                        ) : (
                                <Button className='filterButton'
                                    onClick={() => { setSearching(true) }}
                                    style={{ fontSize: 'calc(2.5vw + 5px)' }}>
                                    Filter
                                </Button>
                            )}

                    </div>
                )}

        </div>
    )
}

export default YourTweetSearch;