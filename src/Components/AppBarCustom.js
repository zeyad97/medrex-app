import React from "react";
import clsx from "clsx";
import {Menu} from "@material-ui/icons";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar, Typography, IconButton, Toolbar, ClickAwayListener} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
}));

const AppBarCustom = ({open, toggleDrawer}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <ClickAwayListener onClickAway={() => {
            if(open){
                toggleDrawer()
            }
        }}>
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
                        onClick={() => toggleDrawer()}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Welcome test
                    </Typography>
                </Toolbar>
            </AppBar>
        </ClickAwayListener>
    );
    };

export default AppBarCustom;