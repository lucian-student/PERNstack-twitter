import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../context/auth';
function Menu() {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <Fragment>
            <Paper className='navigation' elevation={2}>
                <div>
                    {currentUser && (
                        <div className='leftMenu' style={{ display: 'inline-block' }}>
                            <Button className='buttonAnim'>
                                <Link to='/main' className='linkLeft'>
                                    <h2>
                                        Main
                                     </h2>
                                </Link>
                            </Button>
                            <Button className='buttonAnim'>
                                <Link to={`/userPage/${currentUser.user_id}`} className='linkLeft'>
                                    <h2>
                                        You
                                    </h2>
                                </Link>
                            </Button>
                        </div>
                    )}
                    <div className='rightMenu' style={{ display: 'inline-block' }}>
                        {!currentUser ? (
                            <div >
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
                        ) : (
                                <div className='rightMenu' style={{ display: 'inline-block' }}>
                                    <Button className='buttonAnim'
                                        style={{ backgroundColor: 'transparent' }}
                                        onClick={() => { logout() }}>
                                        <h2 className='linkRight'>
                                            Logout
                                         </h2>
                                    </Button>
                                </div>
                            )}
                    </div>
                </div>
            </Paper>
        </Fragment>
    )
}

export default Menu;

/**/