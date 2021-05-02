import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import useStyles from './NavStyle';
import popcorn from '../../images/popcorn.jpg';
import { Link } from 'react-router-dom';


const Nav = () => {
    const classes= useStyles();
        const[user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))

        console.log(user)

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
                        <Button variant = "contained" className={classes.logout} color="secondary">Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/login' /*not sure what the route will be in the vid he says auth */ variant='contained' color="primary">Login</Button>
                )}
            </Toolbar>
       </AppBar>
    )
}

export default Nav
