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
    const [followingInfo, setFollowingInfo] = useState()
    const [followersID, setFollowersID] = useState()
    const [followers, setFollowers] = useState()
    const [result, setResult] = useState()
    // const [addedResult, setAddedResult] = useState(false)
    
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
    console.log(id)
    let id2=(localStorage.getItem("goToID"))
    console.log(id2)

    let arrFollowing=[]
    let arrFollowingNames=[]
    let arrFollowingIDs=[]
    let arrFollowersIDs=[]
    let arrFollowers=[]
    let arrFollowersNames=[]
    let arrFollowingLS=[]
    let arrFollowerLS=[]

    let response
    let response2
    let response3
    let response4
    let response5

    useEffect(() => {
        const getData = async () => {
            response = await usersAPI.getUser(id2)
            setName(response.data.name)
            response2 = await usersAPI.getUser(id2)
            setMyShows(response2.data.myShows)
            response3 = await usersAPI.getUser(id2)
            setPlatforms(response3.data.platforms)
            response4 = await usersAPI.getUser(id2)
            setFollowingID(response4.data.following)
            response5 = await usersAPI.getUser(id2)
            setFollowersID(response5.data.followers)
            
            //make array of followings' names
            for(let i=0;i<response4.data.following.length;i++){
                arrFollowing.push(await usersAPI.getUser(response4.data.following[i]))
            }
          
            for(let i=0;i<arrFollowing.length;i++){
                arrFollowingNames.push(arrFollowing[i].data.name)
                arrFollowingIDs.push(arrFollowing[i].data._id)
                arrFollowingLS.push({name: arrFollowing[i].data.name, id: arrFollowing[i].data._id})
                localStorage.setItem(arrFollowingLS[i].name, arrFollowingIDs[i])
            }
            setFollowing(arrFollowingNames)
            
           //make array of followers' names
            for(let i=0;i<response5.data.followers.length;i++){
                arrFollowers.push(await usersAPI.getUser(response5.data.followers[i]))
            }
            
            for(let i=0;i<arrFollowers.length;i++){
                arrFollowersNames.push(arrFollowers[i].data.name)
                arrFollowersIDs.push(arrFollowers[i].data._id)
                arrFollowerLS.push({name: arrFollowers[i].data.name, id: arrFollowers[i].data._id})
                localStorage.setItem(arrFollowerLS[i].name, arrFollowerLS[i].id)
            }
            setFollowers(arrFollowersNames)
            setDone(true)
        }
        
        getData()
        
    }, [id])

    const clickUserFollowing = (event) => {
        let clickUser= [(event.target)]
        let getClickVal=clickUser[0].classList.value
        let getUserID= localStorage.getItem(getClickVal)
        localStorage.setItem("goToID", getUserID)
        window.location.href="/profile/"+getUserID
    }

    //follow button function
    const addFriend = event => {
        event.preventDefault()
        usersAPI.putFollowing(id, {following: id2})
        // setAddedResult()
        usersAPI.putFollower(id2, {followers: id})
    }

    if(done) {
        return <div className="userProfDiv">
            <Grid container>
                <Card className={classes.top} variant="outlined">
                    <Typography className={classes.title} color="textSecondary" gutterBottom component="h1">
                        Hi, I'm {name}! <button onClick={addFriend}>Follow</button>
                    </Typography>
                </Card>
                
            </Grid>
            <br/>
            <Grid container spacing={1}>
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
                        <Typography variant="body2" component="section">
                        {following.map((value) => {
                            return <p key= {value} className={value} id="otherUserName" onClick={clickUserFollowing}>{value}</p>
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
                        <Typography variant="body2" component="section">
                        {followers.map((value) => {
                            return <p key= {value} className={value} id="otherUserName" onClick={clickUserFollowing}>{value}</p>
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
