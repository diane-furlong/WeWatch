import React, { useState } from 'react';
import API from "../../utils/usersAPI"
import './Nav.css'
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'
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


    return (
        <>
        <AppBar className={classes.appBar} position = 'static' color='inherit'>
            <Toolbar>
            <Typography className={classes.heading} variant='h2' align='center'>
                <img className={classes.image} src={popcorn} alt='icon' height='60'></img>
                <Link className={classes.linkStyle} to ='/'>
                    weWatch
                </Link>
            </Typography>
            <Typography variant="h4">
                Welcome, {name}
            </Typography>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Nav
