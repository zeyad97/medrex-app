//npm config set @bit:registry https://node.bit.dev
// npm i @bit/recharts.recharts.area-chart

import React, {useEffect, useRef, Component } from "react";
import "antd/dist/antd.css";
import { Statistic, } from 'antd';
import { Grid ,makeStyles, CardMedia} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AreaChart from '@bit/recharts.recharts.area-chart';
import Area from '@bit/recharts.recharts.area';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ResponsiveContainer } from "recharts";


const axios = require('axios');

//will use props or sth to enter values

//data which generates the chart 
const data = [
	{		
        name: 'Page E', uv: 1000, 

	},
	{		
        name: 'Page F', uv: 2390,

	},
	{         
        name: 'Page C', uv: 2200, 

	},
	{
        name: 'Page D', uv: 3780, 
	},
	{		
        name: 'Page B', uv: 3500, 

	},
	{
        name: 'Page G', uv: 5490, 

	},
	{
        name: 'Page A', uv: 9000,

	},
];

class StatsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: [],
            loading: true,
        }
    };

    async componentDidMount() {
        try {
            const result = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'queries/getStats',
            {
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY
                  }
            });
            console.log('res',result)
            const response = result.data[0];
            console.log('sc',response)
            this.setState({stats: response});

        } catch (error){
            console.log(error);
        }
    }
    render () {

        return( //https://material-ui.com/components/cards/#ui-controls
            //https://bit.dev/recharts/recharts/area-chart?example=5cebcb9470f126001cdb7d1a
            
            <div>
              
                <Grid container direction="row" justify="center" alignItems="center" spacing={5}
                    style={{background:'#fbfbf8', padding:'30px'}}>
                        <Grid item xs={3}>
                            <Card className='root' >
                                <div className='details' >
                                    <CardContent className='content' >
                                    <Typography component="h4" variant="h4" style ={{color : "#8884d8"}}>
                                        <PersonIcon style ={{marginBottom: '2px',marginRight: '15px', color:"textSecondary"}}/>
                                        {this.state.stats.patients}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary">
                                    Total Patients
                                    </Typography>
                                                                       
                                    </CardContent>
                                </div>
                                <ResponsiveContainer width="100%" height={100}>
                                <AreaChart
                                width={150}
                                height={100}
                                data={data}
                                margin={{
                                    top: 5, right: 5, left: 5, bottom: 5,
                                }}
                            >
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                            </AreaChart>  
                            </ResponsiveContainer>                    
                            </Card>
                       
                            
                        </Grid>
                        <Grid item xs={3}>
                            <Card className='root' >
                                <div className='details' >
                                    <CardContent className='content' >
                                    <Typography component="h4" variant="h4" style ={{color : "#49a34bff"}}>
                                        <LocalHospitalIcon style ={{marginBottom: '2px',marginRight: '15px', color:"textSecondary"}}/>
                                        {this.state.stats.doctors}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary">
                                    Total Doctors
                                    </Typography>
                                                                       
                                    </CardContent>
                                </div>
                                <ResponsiveContainer width="100%" height={100}>
                                <AreaChart
                                width={150}
                                height={100}
                                data={data}
                                margin={{
                                    top: 5, right: 5, left: 5, bottom: 5,
                                }}
                            >
                                <Area type="monotone" dataKey="uv" stroke="#49a34bff" fill="#49a34bff" />
                            </AreaChart>  
                            </ResponsiveContainer>                    
                            </Card>
                       
                            
                        </Grid>
                        <Grid item xs={3}>
                            <Card className='root' >
                                <div className='details' >
                                    <CardContent className='content' >
                                    <Typography component="h4" variant="h4" style ={{color : "#fd9811ff"}}>
                                        <ReceiptIcon style ={{marginBottom: '2px',marginRight: '15px', color:"textSecondary"}}/>
                                        {this.state.stats.emrs}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary">
                                    Total Records
                                    </Typography>
                                                                       
                                    </CardContent>
                                </div>
                                <ResponsiveContainer width="100%" height={100}>
                                <AreaChart
                                width={150}
                                height={100}
                                data={data}
                                margin={{
                                    top: 5, right: 5, left: 5, bottom: 5,
                                }}
                            >
                                <Area type="monotone" dataKey="uv" stroke="#fd9811ff" fill="#fd9811ff" />
                            </AreaChart>  
                            </ResponsiveContainer>                    
                            </Card>
                       
                            
                        </Grid>
                        <Grid item xs={3}>
                            <Card className='root' >
                                <div className='details' >
                                    <CardContent className='content' >
                                    <Typography component="h4" variant="h4" style ={{color : "#ec4b48ff"}}>
                                        <LocalHospitalIcon style ={{marginBottom: '2px',marginRight: '15px', color:"textSecondary"}}/>
                                        {this.state.stats.transactions}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary">
                                    Total Transactions
                                    </Typography>
                                                                       
                                    </CardContent>
                                </div>
                                <ResponsiveContainer width="100%" height={100}>
                                <AreaChart
                                width={150}
                                height={100}
                                data={data}
                                margin={{
                                    top: 5, right: 5, left: 5, bottom: 5,
                                }}
                            >
                                <Area type="monotone" dataKey="uv" stroke="#ec4b48ff" fill="#ec4b48ff" />
                            </AreaChart>  
                            </ResponsiveContainer>                    
                            </Card>
                       
                            
                        </Grid>
                </Grid>
            </div>
            
        );
    }
}

// const StatsGrid = () => {

// const stats = useRef(0);

// useEffect(() => {
//     const fetchData = async () => {

//         console.log("in useEffect");
//         try{

//             const result = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'queries/getStats',
                // {
                //     headers: {
                //         'x-api-key': process.env.REACT_APP_API_KEY
                //       }
                // });
//             console.log('res',result)
//             stats.current = result.data[0];
//             console.log('sc',stats.current)
//         }catch(error){
//             console.log(error)
//         }
//     };
//     fetchData();
// }, []);
//

//==============ZEYAD'S CODE
//    return (
//         <Grid container direction="row" justify="center" alignItems="center" spacing={2}
//               style={{background:'#64b5f6', padding:'30px'}}>
//                 <Grid item xs={3}>
//                     <Card>
//                         <Statistic title="Total Patients" value={stats.current.patients} prefix={<PersonIcon  />} />
//                     </Card>
//                 </Grid>
//                 <Grid item xs={3}>
//                     <Card>
//                         <Statistic title="Total Doctors" value={stats.current.doctors} prefix={<LocalHospitalIcon  />} />
//                     </Card>
//                 </Grid>
//                 <Grid item xs={3}>
//                     <Card>
//                         <Statistic title="Total Records" value={stats.current.emrs} prefix={<ReceiptIcon  />} />
//                     </Card>
//                 </Grid>
//             <Grid item xs={3}>
//                 <Card>
//                     <Statistic title="Total Transactions" value={stats.current.transactions} prefix={<SwapHorizIcon  />} />
//                 </Card>
//             </Grid>
//         </Grid>
//     );
// };

export default StatsGrid;
