import React, { useState } from 'react';
import API from "../../utils/usersAPI"
import './Nav.css'


const Nav = () => {

    const [name, setName] = useState()

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
        <nav className="navbar navbar-expand-lg navbar-light  bg-dark">
            <div className="container">
                <h3>Hi, {name}</h3>
            </div>
        </nav>
    )
}

export default Nav
