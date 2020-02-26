import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function Profile() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        ID
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Participant Name"
                subheader="Participant Type"
            />
            <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Participant Image"
            />
            <CardContent>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    <h4>List of Trusted Doctors: </h4>
                    <h4>&nbsp;[ajskaadah]</h4>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <h5>Name: </h5>
                        <h5>&nbsp;Zeyad Ahmed</h5>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <h5>CNIC Number: </h5>
                        <h5>&nbsp;XXXXX-XXXXX-X</h5>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <h5>Phone Number: </h5>
                        <h5>&nbsp;XXXX-XXXXXXX</h5>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <h5>Date of Birth: </h5>
                        <h5>&nbsp;XX/XX/XX</h5>
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    );
}