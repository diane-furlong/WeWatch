import React, { useState, useEffect } from 'react';
import API from "../../utils/usersAPI"
import './Nav.css'
import { Link } from 'react-router-dom'
import popcorn from '../../img/favicon_popcorn.png'

const Nav2 = () => {

    const [name, setName] = useState()
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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">
            <img src={popcorn} width="30" height="30" class="d-inline-block align-top" alt=""/>
            weWatch
        </a>
            <a class="navbar-brand" href="/profile">Hi, {name}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/platform">Platforms</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/watching">Watching</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/searchusers">Search Friends</a>
                </li>
                </ul>
            </div>
        </nav>
        {/* <MuiThemeProvider theme={theme}>
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
        </MuiThemeProvider> */}
        </>
    )
}

export default Nav2
