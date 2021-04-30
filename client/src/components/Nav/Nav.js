import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import useStyles from './NavStyle'
import popcorn from '../../images/popcorn.jpg'


const Nav = () => {
    const classes= useStyles();

    return (
       <AppBar className={classes.appBar} position='static' color = 'inherit'>
           <Typography className={classes.heading} variant='h2' align='center'>weWatch</Typography>
           <img className={classes.image} src={popcorn} alt='icon' height='60'></img>
       </AppBar>
    )
}

export default Nav
