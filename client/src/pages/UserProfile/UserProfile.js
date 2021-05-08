import React, { useEffect, useState} from 'react'
import usersAPI from '../../utils/usersAPI'
import './UserProfile.css'
import background from "../../img/userProfile.png";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: 'rgba(234, 226, 183, .8)',
    color: '#003049',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 25,
    color: '#003049',
  },
  pos: {
    marginBottom: 12,
    color: '#003049',
  },
  button: {
    color: '#003049',
  },
});



export default function DataDisplayer() {
    const [name, setName] = useState([])
    const [myShows, setMyShows] = useState([])
    const [platforms, setPlatforms] = useState()
    const [following, setFollowing] = useState()
    const [followers, setFollowers] = useState()
    const [done, setDone] = useState(false)

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    
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

    useEffect(() => {
        const getData = async () => {
            const response = await usersAPI.getUser(id)
            setName(response.data.name)
            const response2 = await usersAPI.getUser(id)
            setMyShows(response2.data.myShows)
            const response3 = await usersAPI.getUser(id)
            setPlatforms(response3.data.platforms)
            const response4 = await usersAPI.getUser(id)
            setFollowing(response4.data.following)
            const response5 = await usersAPI.getUser(id)
            setFollowers(response5.data.followers)
            setDone(true)
        }

        getData()
    }, [])

    if(name) {
        return <>
        <div className="search-users-image" style={{ 
            backgroundImage: `url(${background})` 
          }}>
            <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom component="h1">
          Hi, {name}!
        </Typography>
        <Typography variant="h5" component="h2">
        My Shows:
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {myShows}
        </Typography>
        <Typography variant="body2" component="p">
        My Platforms:
          <br />
          {platforms}
        </Typography>
        <br />
        <Typography variant="body2" component="p">
        Following:
          <br />
          {following}
        </Typography>
        <br />
        <Typography variant="body2" component="p">
        Followers:
          <br />
          {followers}
        </Typography>
      </CardContent>

    </Card>

        </div></>

    } else {
        return null
    }

}
