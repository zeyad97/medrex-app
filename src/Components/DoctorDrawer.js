import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SearchField from "react-search-field";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcaseMedical, faFileMedicalAlt, faNotesMedical, faUserMd,} from '@fortawesome/free-solid-svg-icons';
import PatientList from "./PatientTable";
import ViewRecord from "./ViewRecord";
import './DoctorDrawer.css';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function DoctorDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
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
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Welcome Doctor!
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Home', 'View Records', 'Profile', 'Log Out'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div>
                    <Card className="SearchPatient">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Looking for a patient?
                            </Typography>
                            <SearchField className="SearchBox"
                                placeholder="Search using patientID or name"
                                searchText=""
                            />
                        </CardContent>
                    </Card>
                </div>
                    <div className="features">
                            {/*<div className="ViewRequests">*/}
                            {/*    <Card>*/}
                            {/*        <CardContent>*/}
                            {/*            <PatientList/>*/}
                            {/*        </CardContent>*/}
                            {/*    </Card>*/}
                            {/*</div>*/}
                            {/*<div className='Count'>*/}
                            {/*    <div className="CardCount">*/}
                            {/*    <Card className='cardSize'>*/}
                            {/*        <CardContent className='cardValues'>*/}
                            {/*            <div className='myIcon'>*/}
                            {/*            <FontAwesomeIcon className='imgIcon' icon={faUserMd} />*/}
                            {/*            </div>*/}
                            {/*            <div className='stats'>*/}
                            {/*                <div className='number'>*/}
                            {/*                    69*/}
                            {/*                </div>*/}
                            {/*                <div className='entity'>*/}
                            {/*                    Patients*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </CardContent>*/}
                            {/*    </Card>*/}
                            {/*        <Card className='cardSize'>*/}
                            {/*            <CardContent className='cardValues'>*/}
                            {/*                <div className='myIcon'>*/}
                            {/*                    <FontAwesomeIcon className='imgIcon' icon={faBriefcaseMedical} />*/}
                            {/*                </div>*/}
                            {/*                <div className='stats'>*/}
                            {/*                    <div className='number'>*/}
                            {/*                        69*/}
                            {/*                    </div>*/}
                            {/*                    <div className='entity'>*/}
                            {/*                        Doctors*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </CardContent>*/}
                            {/*        </Card>*/}
                            {/*    </div>*/}
                            {/*    <div className="CardCount">*/}
                            {/*        <Card className='cardSize'>*/}
                            {/*            <CardContent className='cardValues'>*/}
                            {/*                <div className='myIcon'>*/}
                            {/*                    <FontAwesomeIcon className='imgIcon' icon={faFileMedicalAlt} />*/}
                            {/*                </div>*/}
                            {/*                <div className='stats'>*/}
                            {/*                    <div className='number'>*/}
                            {/*                        69*/}
                            {/*                    </div>*/}
                            {/*                    <div className='entity'>*/}
                            {/*                        Records*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </CardContent>*/}
                            {/*        </Card>*/}
                            {/*        <Card className='cardSize'>*/}
                            {/*            <CardContent className='cardValues'>*/}
                            {/*                <div className='myIcon'>*/}
                            {/*                    <FontAwesomeIcon className='imgIcon' icon={faNotesMedical} />*/}
                            {/*                </div>*/}
                            {/*                <div className='stats'>*/}
                            {/*                    <div className='number'>*/}
                            {/*                        69*/}
                            {/*                    </div>*/}
                            {/*                    <div className='entity'>*/}
                            {/*                        Transactions*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </CardContent>*/}
                            {/*        </Card>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        <ViewRecord />
                    </div>
            </main>
        </div>
    );
}