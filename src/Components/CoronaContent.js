
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
        width: 650,
    },
    media: {
        height: 140,
    },
});

export default function CoronaContent() {
    const classes = useStyles();
    const [rec,setRec] = React.useState([]);
    const [rec1, setRec1] = React.useState([]);
    const [loading,setLoading]= React.useState(true);


    const fetchData = async() =>{
        try {
            const result = await axios.get('https://api.covid19api.com/total/country/pakistan');
            console.log(result.data[result.data.length - 1]);
            setRec(result.data[result.data.length - 1]);
            const result1 = await axios.get('https://api.covid19api.com/total/country/us');
            console.log(result1.data[result1.data.length - 1]);
            setRec1(result1.data[result1.data.length - 1]);
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
    let updateTo1 = rec1["Date"];

    return (
        loading?<div><p>Loading..</p></div>:
            <Grid container justify='center' alignContent='center' alignItems='center' spacing={3}>
                <Grid item xs={6}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://source.unsplash.com/fuqv-V02ZhE/1600x900"
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
                <Grid item xs={6}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://source.unsplash.com/VO0OEWNS8gc/1600x900"
                                title="The United States"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {rec1.Country}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Following are the statistics of the novel COVID-19 in the US as of {updateTo1.substring(0,10)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Statistic title="Total Confirmed Cases" value={rec1.Confirmed} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Statistic title="Total Deaths" value={rec1.Deaths} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Statistic title="Total Recovered" value={rec1.Recovered} />
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
    );
}
