import React from "react";
import "antd/dist/antd.css";
import { Grid, Box } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Statistic, Card } from "antd";
import { spacing } from '@material-ui/system';

//will use props or sth to enter values
const StatsGrid = () => {

    return (
        <div>
            <h1>Hello!</h1>
        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item med={4}>
                    <Card>
                        <Statistic title="Total Patients" value={11} prefix={<PersonIcon  />} />
                    </Card>
                </Grid>
                <Grid item med={4}>
                    <Card>
                        <Statistic title="Total Doctors" value={11} prefix={<LocalHospitalIcon  />} />
                    </Card>
                </Grid>
                <Grid item med={4}>
                    <Card>
                        <Statistic title="Total Records" value={11} prefix={<ReceiptIcon  />} />
                    </Card>
                </Grid>
            <Grid item med={4}>
                <Card>
                    <Statistic title="Total Transactions" value={11} prefix={<SwapHorizIcon  />} />
                </Card>
            </Grid>
        </Grid>
        </div>
    );
};

export default StatsGrid;
