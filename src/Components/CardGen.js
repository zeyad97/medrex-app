import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard() {
    const classes = useStyles();

    const [cards] = React.useState(
        [{text1:'Blockchain Based',text2: 'Your EHRs, in your control, secured through the latest technologies',
            imgLink:'https://source.unsplash.com/zt0HWquGXlQ'},
            {text1:'EMR Management',text2:'Manage your health records just like you manage your bank account',
                imgLink:'https://source.unsplash.com/k7ll1hpdhFA'},
            {text1:'Stay Updated',text2:'Get notified via email when a transaction pertaining to you occurs',
                imgLink:'https://source.unsplash.com/0vsk2_9dkqo'},
            {text1:'HIPAA & HL7',text2:'Business logic is based upon HIPAA and EHRs follow the HL7 format',
                imgLink:'https://source.unsplash.com/p1kYI_kzySQ'}]);

    return (
        <Grid container spacing={3} alignItems='center' alignContent='center'>
            {cards.map((card) =>
                <Grid item xs={6}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={card.imgLink}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card.text1}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {card.text2}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            )}
        </Grid>
    );
}
