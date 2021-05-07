import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        // borderRadius: 15,
        // margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        background: '#EAE2B7',
        borderBottom: '8px solid #D62828'
    },
    heading: {
        color: 'rgba(45, 190, 207, 1)',
        textDecoration: 'none',
    },
    image: {
        marginLeft: '15px',
        marginRight: '15px'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        // width: '400px',
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    linkStyle: {
        color: '#003049',
        textDecoration: 'none'
    },
    root: {
        flexGrow: '1',
    },
    signOut: {
        color:'#D62828',
        flexGrow: '1'
    },
    login: {
        color:'#F77F00',
        flexGrow: '1',
        textDecoration: 'none'
    },
    register: {
        color: '#003049',
        flexGrow: '1',
        textDecoration: 'none'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#F77F00'
    },
}));