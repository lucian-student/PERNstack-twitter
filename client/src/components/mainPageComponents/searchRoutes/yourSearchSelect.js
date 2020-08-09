import React, { useContext } from 'react';
import {
    Checkbox,
    Button
} from '@material-ui/core';
import { FilterContext } from '../../../context/filter';
function YourSearchSelect({ properties: { setRoute, setSearching } }) {
    const { yourFilters, setYourFilters, required } = useContext(FilterContext);
    function handlechange(event) {
        switch (event.target.id) {
            case 'num_of_likes':
                // code block
                setYourFilters({ num_of_likes: event.target.checked, num_of_comments: false });
                break;
            case 'num_of_comments':
                // code block
                setYourFilters({ num_of_comments: event.target.checked, num_of_likes: false });
                break;
            default:
                console.log('failed');
        }
    }
    return (
        <div>
            <div style={{ overflow: 'hidden' }}>
                <h3 style={{ display: 'inline-block' }}>
                    Number of Likes
               </h3>
                <Checkbox className='filterCheckBox'
                    checked={yourFilters.num_of_likes}
                    onChange={handlechange}
                    id='num_of_likes' />
            </div>
            <div style={{ overflow: 'hidden' }}>
                <h3 style={{ display: 'inline-block' }}>
                    Number of Comments
                </h3>
                <Checkbox className='filterCheckBox'
                    checked={yourFilters.num_of_comments}
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
                    disabled={required()}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default YourSearchSelect;