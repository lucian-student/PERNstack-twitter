import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import SearchSelect from './searchRoutes/searchSelect';
import SearchForm from './searchRoutes/searchForm';
import { FilterContext } from '../../context/filter';
function GeneralTweetSearch() {
    const [route, setRoute] = useState('select');
    const [searching, setSearching] = useState(false);
    const { generalQueryValues: { query }, setGeneralQueryValues } = useContext(FilterContext);
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
                                        setGeneralQueryValues({
                                            query: 'general',
                                            page: 0,
                                            sortValue: null,
                                            username: null
                                        });
                                    }}>
                                    No Filters
                        </Button>
                            </div>
                        ) : (
                                <Button className='filterButton'
                                    style={{ fontSize: 'calc(2.5vw + 5px)' }}
                                    onClick={() => { setSearching(true) }}>
                                    Filter
                                </Button>
                            )}

                    </div>
                )}
        </div>
    )
}

export default GeneralTweetSearch;