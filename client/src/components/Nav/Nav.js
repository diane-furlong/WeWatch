import React, { useState } from 'react';
import API from "../../utils/usersAPI"
import './Nav.css'
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import useStyles from './NavStyle.js'
import popcorn from '../../img/favicon_popcorn.png'

const Nav = () => {

    const [name, setName] = useState()
    const classes = useStyles();

    //using token to find user's db id
    let usertoken = localStorage.getItem("token")
    usertoken = usertoken?.split(" ")
    let usertokenArray = []
    if(usertoken){
        for(let i =0; i < usertoken.length; i++){
            usertokenArray.push(usertoken[i])
            if(i != usertoken.length-1){
                usertokenArray.push(" ");
            }
        }
    }
    const id = usertokenArray[2] 

    //GET request to display users name
    API.getUser(id)
    .then(res=> {
        setName(res.data.name)
    })

    const handleSignOut = () => {
        localStorage.clear()
        window.location.href='/'
    }

    return (
        <>
        <AppBar className={classes.appBar} position = 'static' color='inherit'>
            <Toolbar className={classes.toolbar}>
            <Typography className={classes.heading} variant='h3' align='center' className={classes.root}>
                <img className={classes.image} src={popcorn} alt='icon' height='60'></img>
                <Link className={classes.linkStyle} to ='/'>
                    weWatch
                </Link>
            </Typography>
            <Typography variant="h4" className={classes.root}>
                Welcome, {name}
            </Typography>
            <Button className={classes.login}>
                <Link className={classes.login} to='/login'>
                Login
                </Link>
            </Button>
            <Button className={classes.register}>
                <Link className={classes.register} to='/register'>
                    Register
                </Link>
            </Button>
            <Button className={classes.signOut} onClick={handleSignOut}>
                    Sign Out
            </Button>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Nav
