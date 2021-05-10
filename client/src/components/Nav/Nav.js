import React, { useState, useEffect } from 'react';
import API from "../../utils/usersAPI"
import './Nav.css'
import { AppBar,
     Typography,
      Toolbar,
       Button, 
       Grid, 
       createMuiTheme,
       responsiveFontSizes,
       MuiThemeProvider,
     } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './NavStyle.js'
import popcorn from '../../img/favicon_popcorn.png'


const Nav = () => {

    const [name, setName] = useState()
    const classes = useStyles();
    const [loggedIn, setLogin] = useState(false)
   

    //using token to find user's db id
    let usertoken = localStorage.getItem("token")
    usertoken = usertoken?.split(" ")
    let usertokenArray = []
    if(usertoken){
        for(let i =0; i < usertoken.length; i++){
            usertokenArray.push(usertoken[i])
            if(i !== usertoken.length-1){
                usertokenArray.push(" ");
            }
        }
    }
    const id = usertokenArray[2] 

    //GET request to display users name
    API.getUser(id)
    .then(res=> {
        setName(res.data.name)
        setLogin(true)
    })

    const handleSignOut = () => {
        localStorage.clear()
        window.location.href='/'
        setName(null)
        setLogin(false)
    }

    return (
        <>
        <Grid container direction='column' justify='center'>
        <AppBar className={classes.appBar} className="navbar" position = 'static' color='inherit'>
            <Toolbar className={classes.toolbar} className="toolbar">
            <Typography className={classes.heading} variant='h3' align='center' className={classes.root}>
                <img className={classes.image} src={popcorn} alt='icon' height='60'></img>
                <Link className={classes.linkStyle} to ='/'>
                    weWatch
                </Link>
            </Typography>
                     {loggedIn === false ?  <>
                     <Button className={classes.login}>
                <Link className={classes.login} variant='h6' to='/login'>
                            Login
                </Link>
            </Button>
            <Button className={classes.navButton}>
                <Link className={classes.navButton} to='/register'>
                                Register
                </Link>
            </Button> </> : <> <Typography variant="h6" className={classes.root}>
                        Welcome, {name}
                </Typography>
            <Button className={classes.navButton}>
                <Link className={classes.navButton} to='/Platform'> 
                    Platforms
                </Link>
            </Button>
                <Button className={classes.navButton}>
                    <Link className={classes.navButton} to='/Watching'>
                        Add a Show
                    </Link>
                </Button>
                <Button className={classes.navButton}>
                    <Link className={classes.navButton} to='/SearchUsers'>
                        Find Friends
                    </Link>
                </Button>
                <Button className={classes.navButton}>
                    <Link className={classes.navButton} to='/Profile'>
                        My Profile
                    </Link>
                </Button>
            <Button className={classes.signOut} onClick={handleSignOut}>
                        Sign Out
            </Button>
                   </>  }
            </Toolbar>
        </AppBar>
            </Grid>
        </>
    )
}

export default Nav
