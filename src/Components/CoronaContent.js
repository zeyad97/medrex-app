
import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Statistic } from 'antd';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
const axios = require('axios');

const useStyles = makeStyles({
    root: {
        maxWidth: 700,
    },
    media: {
        height: 140,
    },
});

export default function CoronaContent() {
    const classes = useStyles();
    const [rec,setRec] = React.useState([]);
    const [loading,setLoading]= React.useState(true);


    const fetchData = async() =>{
        try {
            const result = await axios.get('https://api.covid19api.com/total/country/pakistan');
            console.log(result.data[result.data.length - 1]);
            setRec(result.data[result.data.length - 1]);
            setLoading(false);
        }catch(error){
            console.log(error);
        }
    }

    useEffect( () => {
        fetchData();
    }, []);

    console.log(rec);
    let updateTo = rec["Date"];

    return (
        loading?<div><p>Loading..</p></div>:
            <Grid container justify='center' alignContent='center' alignItems='center'>
                <Grid item xs={12}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://source.unsplash.com/fuqv-V02ZhE"
                                title="Pakistan"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {rec.Country}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Following are the statistics of the novel COVID-19 in Pakistan as of {updateTo.substring(0,10)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Statistic title="Total Confirmed Cases" value={rec.Confirmed} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Statistic title="Total Deaths" value={rec.Deaths} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Statistic title="Total Recovered" value={rec.Recovered} />
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
    );
}
