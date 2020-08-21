import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { FilterContext } from '../../../context/filter';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
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
                <h3 style={{
                    display: 'inline-block',
                }}
                    className='selectProp'>
                    Number of Likes
               </h3>
                <Checkbox className='filterCheckBox'
                    checked={yourFilters.num_of_likes}
                    onChange={handlechange}
                    icon={<CheckBoxOutlineBlankIcon className='selectProp' />}
                    checkedIcon={<CheckBoxIcon className='selectProp' />}
                    id='num_of_likes' />
            </div>
            <div style={{ overflow: 'hidden' }}>
                <h3 style={{
                    display: 'inline-block',
                    className: 'selectProp'
                }}>
                    Number of Comments
                </h3>
                <Checkbox className='filterCheckBox'
                    checked={yourFilters.num_of_comments}
                    onChange={handlechange}
                    icon={<CheckBoxOutlineBlankIcon className='selectProp' />}
                    checkedIcon={<CheckBoxIcon className='selectProp' />}
                    id='num_of_comments' />
            </div>
            <div>
                <Button className='searchButtons'
                    onClick={() => {
                        setRoute('select');
                        setSearching(false)
                    }}>
                    Cancel
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