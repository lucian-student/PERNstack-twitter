import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
    Paper,
    Button
} from '@material-ui/core';

function Menu() {


    return (
        <Fragment>
            <Paper className='navigation' elevation={2}>
                <div>
                    <div className='leftMenu' style={{ display: 'inline-block' }}>
                        <Button className='buttonAnim'>
                            <Link to='/main' className='linkLeft'>
                                <h2>
                                    Menu
                                 </h2>
                            </Link>
                        </Button>
                    </div>
                    <div className='rightMenu' style={{ display: 'inline-block' }}>
                        <Button className='buttonAnim'
                            style={{ backgroundColor: 'transparent' }}>
                            <Link to='/' className='linkRight'>
                                <h2>
                                    Login
                                 </h2>
                            </Link>
                        </Button>
                        <Button className='buttonAnim'
                            style={{ backgroundColor: 'transparent' }}>
                            <Link to='/register' className='linkRight'>
                                <h2>
                                    Register
                                 </h2>
                            </Link>
                        </Button>
                    </div>
                </div>
            </Paper>
        </Fragment>
    )
}

export default Menu;