import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import useStyles from './NavStyle';
import popcorn from '../../images/popcorn.jpg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';


const Nav = () => {
    const classes= useStyles();
        const[user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))
        const dispatch = useDispatch();
        const history = useHistory();
        const location = useLocation();

        const logout = () => {
            dispatch({ type: 'LOGOUT'})
            history.push('/')
            setUser(null)
        }

        console.log(user)

        useEffect(() => {
            const token = user?.token;
        

        //JWT ...

        setUser(JSON.parse(localStorage.getItem('profile')));
            
         }, [location] );

    return (
       <AppBar className={classes.appBar} position='static' color = 'inherit'>
           <div className={classes.brandContainer}>
           <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>weWatch</Typography>
           <img className={classes.image} src={popcorn} alt='icon' height='60'></img>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant = "contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/login' variant='contained' color="primary">Login</Button>
                )}
            </Toolbar>
       </AppBar>
    )
}

export default Nav
