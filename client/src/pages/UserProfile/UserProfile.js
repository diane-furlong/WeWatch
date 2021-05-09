import React, { useEffect, useState} from 'react'
import usersAPI from '../../utils/usersAPI'
import './UserProfile.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    background: 'rgba(234, 226, 183, .8)',
    color: '#003049',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    width: 100
  },
  root2: {
    minWidth: 150,
    background: 'rgba(234, 226, 183, .8)',
    color: '#003049',
    justifyContent: 'center',
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  top: {
    minWidth: 150,
    background: 'rgba(234, 226, 183, .8)',
    color: '#003049',
    width: `50%`,
    margin: 10,
    textAlign: 'center'
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
    const [followingID, setFollowingID] = useState()
    const [following, setFollowing] = useState()
    const [followersID, setFollowersID] = useState()
    const [followers, setFollowers] = useState()
    const [done, setDone] = useState(false)

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    
    //using token to find user's db id
    let usertoken = localStorage.getItem("token")
    usertoken = usertoken?.split(" ")
    let usertokenArray = []
    for(let i=0; i<usertoken.length; i++){
        usertokenArray.push(usertoken[i])
        if(i !== usertoken.length-1){
            usertokenArray.push(" ");
        }
    }
    const id = usertokenArray[2]

    let arrFollowing=[]
    let arrFollowingNames=[]
    let arrFollowers=[]
    let arrFollowersNames=[]

    useEffect(() => {
        const getData = async () => {
            const response = await usersAPI.getUser(id)
            setName(response.data.name)
            const response2 = await usersAPI.getUser(id)
            setMyShows(response2.data.myShows)
            const response3 = await usersAPI.getUser(id)
            setPlatforms(response3.data.platforms)
            const response4 = await usersAPI.getUser(id)
            setFollowingID(response4.data.following)
            const response5 = await usersAPI.getUser(id)
            setFollowersID(response5.data.followers)
            
            //make array of followings' names
            for(let i=0;i<response4.data.following.length;i++){
                arrFollowing.push(await usersAPI.getUser(response4.data.following[i]))
            }
            for(let i=0;i<arrFollowing.length;i++){
                arrFollowingNames.push(arrFollowing[i].data.name)
            }
            setFollowing(arrFollowingNames)

            //make array of followers' names
            for(let i=0;i<response5.data.followers.length;i++){
                arrFollowers.push(await usersAPI.getUser(response5.data.followers[i]))
            }
            for(let i=0;i<arrFollowers.length;i++){
                arrFollowersNames.push(arrFollowers[i].data.name)
            }
            setFollowers(arrFollowersNames)
            setDone(true)
        }
        
        getData()
    }, [id])

    if(done) {
        return <div className="userProfDiv">
            <Grid 
            container 
            // direction="column" alignItems="center"
            >
                <Card className={classes.top} variant="outlined">
                    <Typography className={classes.title} color="textSecondary" gutterBottom component="h1">
                        Hi, {name}!
                    </Typography>
                </Card>
            </Grid>
            <br/>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Card className={classes.root} variant="outlined">
                        <Typography variant="h5" component="h2">
                            My shows:
                        </Typography>
                    </Card>
                    <Card className={classes.root2} variant="outlined">
                        <Typography className={classes.pos} color="textSecondary">
                            {myShows.map((value, index) => {
                                return <li key={index}>{value}</li>
                            })}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.root} variant="outlined">
                        <Typography variant="h5" component="h2">
                            My platforms:
                        </Typography>
                    </Card>
                    <Card className={classes.root2} variant="outlined">
                        <Typography variant="body2" component="p">
                            {platforms.map((value, index) => {
                                return <li key={index}>{value}</li>
                            })}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
            <br />
            <Grid container>
                <Grid item xs={6}>
                    <Card className={classes.root} variant="outlined">
                        <Typography variant="h5" component="h2">
                            Following:
                        </Typography>
                    </Card>
                    <Card className={classes.root2} variant="outlined">
                        <Typography variant="body2" component="p">
                        {following.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.root} variant="outlined">
                        <Typography variant="h5" component="h2">
                            Followers:
                        </Typography>
                    </Card>
                    <Card className={classes.root2} variant="outlined">
                        <Typography variant="body2" component="p">
                        {followers.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </div>

    } else {
        return null
    }

}
