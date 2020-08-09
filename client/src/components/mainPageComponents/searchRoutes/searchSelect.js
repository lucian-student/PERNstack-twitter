import React, { useContext } from 'react';
import {
    Checkbox,
    Button
} from '@material-ui/core';
import { FilterContext } from '../../../context/filter';

function SearchSelect({ properties: { setRoute, setSearching } }) {
    const { filters, setFilters, requiredGeneral } = useContext(FilterContext);

    function handlechange(event) {
        switch (event.target.id) {
            case 'username':
                // code block
                setFilters({ ...filters, username: event.target.checked });
                break;
            case 'num_of_likes':
                // code block
                setFilters({ ...filters, num_of_likes: event.target.checked, num_of_comments: false });
                break;
            case 'num_of_comments':
                // code block
                setFilters({ ...filters, num_of_comments: event.target.checked, num_of_likes: false });
                break;
            default:
                console.log('failed');
        }
    }
    return (
        <div>
            <div style={{ overflow: 'hidden' }}>
                <h3 style={{ display: 'inline-block' }}>
                    Username
               </h3>
                <Checkbox className='filterCheckBox'
                    checked={filters.username}
                    onChange={handlechange}
                    id='username' />
            </div>
            <div style={{ overflow: 'hidden' }}>
                <h3 style={{ display: 'inline-block' }}>
                    Number of Likes
               </h3>
                <Checkbox className='filterCheckBox'
                    checked={filters.num_of_likes}
                    onChange={handlechange}
                    id='num_of_likes' />
            </div>
            <div style={{ overflow: 'hidden' }}>
                <h3 style={{ display: 'inline-block' }}>
                    Number of Comments
                </h3>
                <Checkbox className='filterCheckBox'
                    checked={filters.num_of_comments}
                    onChange={handlechange}
                    id='num_of_comments' />
            </div>
            <div>
                <Button className='searchButtons'
                    onClick={() => {
                        setRoute('select');
                        setSearching(false)
                    }}>
                    Cancel Search
                </Button>
                <Button className='searchButtons'
                    onClick={() => { setRoute('form') }}
                    disabled={requiredGeneral()}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default SearchSelect;