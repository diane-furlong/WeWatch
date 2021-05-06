import React from 'react';
import  "./Landing.css"
import Particles from 'react-particles-js';
import particlesConfig from '../../config/particlesConfig';
// import Particles from 'particles.js'
import background from "../../img/movie-popcorn.jpg"
import img from "../../img/popcorn1.png"

const Landing = () => {
    const onClickRegister = () => {
        window.location.href='/register'
    }
    const onClickLogin = () => {
        window.location.href='/login'
    }
   
    const particlesConfig = {
        "particles": {
            "number": {
              "value": 17,
              "density": {
                "enable": true,
                "value_area": 881.8766334760375
              }
            },
            "color": {
              "value": "#c2dc00"
            },
            "shape": {
              "type": "image",
              "stroke": {
                "width": 4,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 6
              },
              "image": {
                "src": `${img}`,
                "width": 500,
                "height": 500
              }
            },
            "opacity": {
              "value": 0.9,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 35.51164387345227,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#ffffff",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": false,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 9,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": false
        }
    
    return (
        <div className="landing-image" style={{ 
            backgroundImage: `url(${background})` 
          }}>
         
        <div style={{ position: 'relative', overflow: "hidden"}}>
        <div style={{ position: 'absolute'}}>
        <Particles height="100vh" width="100vw" params={particlesConfig}/>
      </div>
        <div className="container landing-center">
            <div className = "row">
                <div className = "col-sm-12 center-align">
                    <div className="landing-text">
                        <h1 className="weWatch">weWatch</h1> <h4 className="share">Share what you are watching!</h4>
                    </div>
                        {/* <button onClick={event => onClickRegister(event)} className="landing-btn btn-primary landing-btn-lg">Register</button>
                        <br></br>
                    <button onClick={event => onClickLogin(event)} className="landing-btn btn-success landing-btn-lg">Login</button> */}
                </div>
            </div>
            </div>
        </div>
   </div>
    )
}

export default Landing
