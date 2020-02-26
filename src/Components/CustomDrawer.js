import React from 'react';
import clsx from "clsx";
import {ChevronLeft, ChevronRight, Home, ExitToApp, Description} from "@material-ui/icons";
import {Divider, ListItemText, ListItemIcon, ListItem, List, IconButton, Drawer} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import * as constants from '../data/constants'


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
}));

const CustomDrawer = ({open, toggleDrawer, isDoctor}) => {
    const classes = useStyles();
    const theme = useTheme();

    const items = isDoctor ? constants.doctorMenuItems : constants.patientMenuItems;

    return (
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
                <IconButton onClick={() => {
                    toggleDrawer()
                }}>
                    {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {items.map(item => {
                    console.log(item)
                    return (
                        <ListItem button>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText>{item.txt}</ListItemText>
                        </ListItem>
                    )
                })}
            </List>
        </Drawer>
    );
};

export default CustomDrawer;