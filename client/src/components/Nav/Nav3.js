import { Navbar,Nav, Button } from 'react-bootstrap'
import React, { useState } from 'react';
import API from "../../utils/usersAPI"
import './Nav.css'
import popcorn from '../../img/favicon_popcorn.png'
import 'bootstrap/dist/css/bootstrap.css';
import './nav3.css'


const Nav3 = () => {

    const [name, setName] = useState()
    const [loggedIn, setLogin] = useState(false)


    //using token to find user's db id
    let usertoken = localStorage.getItem("token")
    usertoken = usertoken?.split(" ")
    let usertokenArray = []
    if (usertoken) {
        for (let i = 0; i < usertoken.length; i++) {
            usertokenArray.push(usertoken[i])
            if (i !== usertoken.length - 1) {
                usertokenArray.push(" ");
            }
        }
    }
    const id = usertokenArray[2]

    //GET request to display users name
    API.getUser(id)
        .then(res => {
            setName(res.data.name)
            setLogin(true)
        })

    const handleSignOut = () => {
        localStorage.clear()
        window.location.href = '/'
        setName(null)
        setLogin(false)
    }

    return(
        <div className="headerRow">
                <div className="header col-md-12">

                    <Navbar className='color-nav'  variant='light' expand="md" sticky="top">
                        <img src={popcorn} width="30" height="30" className="d-inline-block align-top" alt="popcorn-container" />
                            <Navbar.Brand href="/">weWatch</Navbar.Brand>
                        {loggedIn == false ? <> <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                    </Nav>
                                    </Navbar.Collapse>
                        </> : <> 
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav>
                            <a className="navbar-brand" href="/Profile">Hi, {name}</a>
                            <Navbar.Collapse>
                            <Nav.Link href="/Platform">Platforms</Nav.Link>
                            <Nav.Link href="/Watching">Watching</Nav.Link>
                            <Nav.Link href="/SearchUsers">Find Friends</Nav.Link>
                            <Nav.Link href="/Profile">My Profile</Nav.Link>
                        <Button className="signOutBtn" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                            </Navbar.Collapse>
                            </Nav>
                        </>
                        }
         
                    </Navbar>
                        <br />
                </div>
        </div>
    )  
}

export default Nav3