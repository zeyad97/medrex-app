import React from "react";
import CustomDrawer from "./CustomDrawer";
import DoctorView from "./DoctorView";
import PatientView from "./PatientView";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import AppBarCustom from "./AppBarCustom";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(20),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
        },

    },
}));


export default function Home() {
    const classes = useStyles();

    const [isDoctor, setIsDoctor] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBarCustom open={open} toggleDrawer={toggleDrawer}/>
            <CustomDrawer open={open} toggleDrawer={toggleDrawer} isDoctor={isDoctor} />


            <div onClick={() => setIsDoctor(!isDoctor)} style={{marginTop: 100}}>Doctor</div>
            <main className={classes.content}>
                {isDoctor && <DoctorView/>}
                {!isDoctor && <PatientView/>}
            </main>
        </div>
    );
}