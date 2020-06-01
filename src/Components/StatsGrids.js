import React from "react";
import "antd/dist/antd.css";
import { Statistic, Card, Row, Col } from 'antd';
import { Grid } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ReceiptIcon from '@material-ui/icons/Receipt';

//will use props or sth to enter values
const StatsGrid = () => {

    return (
        <div style={{background:'#ececec', padding:'30px'}}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                <Grid item xs={3}>
                    <Card>
                        <Statistic title="Total Patients" value={11} prefix={<PersonIcon  />} />
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <Statistic title="Total Doctors" value={11} prefix={<LocalHospitalIcon  />} />
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <Statistic title="Total Records" value={11} prefix={<ReceiptIcon  />} />
                    </Card>
                </Grid>
            <Grid item xs={3}>
                <Card>
                    <Statistic title="Total Transactions" value={11} prefix={<SwapHorizIcon  />} />
                </Card>
            </Grid>
        </Grid>
        </div>
    );
};

export default StatsGrid;
