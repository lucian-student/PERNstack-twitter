import React, { useContext } from 'react';
import {
    Checkbox,
    Button
} from '@material-ui/core';
import { FilterContext } from '../../../context/filter';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
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
                <h3 style={{
                    display: 'inline-block',
                    fontSize: 'calc(3vw + 3px)'
                }}>
                    Username
               </h3>
                <Checkbox className='filterCheckBox'
                    checked={filters.username}
                    onChange={handlechange}
                    icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 'calc(3vw + 3px)' }} />}
                    checkedIcon={<CheckBoxIcon style={{ fontSize: 'calc(3vw + 3px)' }} />}
                    id='username' />
            </div>
            <div style={{ overflow: 'hidden' }}>
                <h3 style={{
                    display: 'inline-block',
                    fontSize: 'calc(3vw + 3px)'
                }}>
                    Number of Likes
               </h3>
                <Checkbox className='filterCheckBox'
                    checked={filters.num_of_likes}
                    onChange={handlechange}
                    icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 'calc(3vw + 3px)' }} />}
                    checkedIcon={<CheckBoxIcon style={{ fontSize: 'calc(3vw + 3px)' }} />}
                    id='num_of_likes' />
            </div>
            <div style={{ overflow: 'hidden' }}>
                <h3 style={{
                    display: 'inline-block',
                    fontSize: 'calc(3vw + 3px)'
                }}>
                    Number of Comments
                </h3>
                <Checkbox className='filterCheckBox'
                    checked={filters.num_of_comments}
                    onChange={handlechange}
                    icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 'calc(3vw + 3px)' }} />}
                    checkedIcon={<CheckBoxIcon style={{ fontSize: 'calc(3vw + 3px)' }} />}
                    id='num_of_comments' />
            </div>
            <div>
                <Button className='searchButtons'
                    onClick={() => {
                        setRoute('select');
                        setSearching(false)
                    }}
                    style={{ fontSize: 'calc(1.5vw + 5px)' }}>
                    Cancel
                </Button>
                <Button className='searchButtons'
                    onClick={() => { setRoute('form') }}
                    disabled={requiredGeneral()}
                    style={{ fontSize: 'calc(1.5vw + 5px)' }}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default SearchSelect;