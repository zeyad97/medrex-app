//Our site navigator
//General Component


import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonIcon from '@material-ui/icons/Person';
import AccessRequestsTable from "./AccessRequestsTable";
import {useAuth0} from "../react-auth0-spa";
import EMedicalTable from "./EMedicalTable";
import AccessibleEMRByDocTable from './AccessibleEMRByDocTable';
import SearchPatient from "./SearchPatient";
import StatsGrid from "./StatsGrids";
import Profile from "./Profile";
import Skeleton from "@material-ui/lab/Skeleton";
const axios = require('axios');

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const {isAuthenticated, logout} = useAuth0();
    const { user } = useAuth0();
    const [index, setIndex] = React.useState('');
    const [party, setParty] = React.useState([]);
    const [ loading, setLoading] = React.useState(true);


    async function fetchData(myValue){
        try {
            const docData = await axios.get(process.env.REACT_APP_NGROK_HTTP +'doctor/' + myValue,
                {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                });
            let dataToAdd = docData.data
            setIndex('3');
            setParty(dataToAdd);
        }catch (error) {
            try {
                const patData = await axios.get(process.env.REACT_APP_NGROK_HTTP +'patient/' + myValue,
                    {
                        headers: {
                            'x-api-key': process.env.REACT_APP_API_KEY
                        }
                    })
                let dataToAdd = patData.data;
                setIndex('0');
                setParty(dataToAdd);
            } catch (error) {
                console.log(error)
            }
        }
        setLoading(false);
    }

    useEffect( () => {
        fetchData(user.sub.substring(9, 25));
    }, [user.sub.substring(9, 25)]);



    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const changeComponent = (event,index) => {
        setIndex(index);
    }


    const listRendering = (value) => {
        let listToRender;
        if (value === 'org.medrex.basic.patient') {
            listToRender =
                <div>
                    <ListItem selected={index === '0'} onClick={(event) => changeComponent(event,'0')}
                        button>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                    <ListItem selected={index === '1'} onClick={(event) => changeComponent(event,'1')}
                        button>
                        <ListItemIcon><DescriptionIcon/></ListItemIcon>
                        <ListItemText>My E-Health-Records</ListItemText>
                    </ListItem>
                    <ListItem selected={index === '2'} onClick={(event) => changeComponent(event,'2')}
                        button>
                        <ListItemIcon><PersonIcon/></ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </ListItem>
                </div>
            ;
        } else {
            listToRender =
                <div>
                    <ListItem selected={index === '3'} onClick={(event) => changeComponent(event,'3')}
                        button>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                    <ListItem selected={index === '4'} onClick={(event) => changeComponent(event,'4')}
                        button>
                        <ListItemIcon><DescriptionIcon/></ListItemIcon>
                        <ListItemText>My created EHRs</ListItemText>
                    </ListItem>
                    <ListItem selected={index === '5'} onClick={(event) => changeComponent(event,'5')}
                        button>
                        <ListItemIcon><PersonIcon/></ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </ListItem>
                </div>;
        }
        return listToRender;
    }

        console.log(party);
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => {
                                handleDrawerOpen();
                            }}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        {/*<Typography variant="h6" noWrap>*/}
                            Welcome {party.fName}!
                        {/*</Typography>*/}
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        {listRendering(party.$class)}
                        {isAuthenticated && <ListItem button onClick={() => logout()}>
                            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                            <ListItemText>Log Out</ListItemText>
                        </ListItem>}
                    </List>
                </Drawer>
                <main className={clsx(classes.content, {[classes.contentShift]: open,})}>
                    <div className={classes.drawerHeader}>
                    </div>
                    {loading? <div>
                        <Skeleton variant="text" />
                        <Skeleton variant="rect"/>
                    </div>:
                    <div>
                        {index === '0' && <div>
                            <StatsGrid/>
                            <AccessRequestsTable user={party}/>
                        </div> }
                        {index === '1' && <div>
                            <h1>Your Medical Record</h1>
                            <EMedicalTable identity={party}/>
                        </div>
                        }
                        {index === '2' && <div>
                            <h1>Profile to be included here</h1>
                        </div>}
                        {index === '3' && <div>
                            <StatsGrid/>
                            <SearchPatient doctor={party}/>
                        </div>}
                        {index === '4' && <div>
                            <AccessibleEMRByDocTable user={party}/>
                        </div>}
                        {index === '5' && <div>
                            <Profile user={party}/>
                        </div>}
                    </div>}
                </main>
            </div>
        );
    }
