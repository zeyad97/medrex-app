import React, {useEffect} from 'react';
import PropTypes, {number} from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Button} from "@material-ui/core";
const axios = require('axios')

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function Row(props) {
    const { recordArray } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    async function revoke(varOne,indexValue) {
            try{
                const response = await axios.post(process.env.REACT_APP_NGROK_HTTP + 'revokeAccess',
                    {
                        "$class": "org.medrex.basic.revokeAccess",
                        "record": "resource:org.medrex.basic.healthRecord#" + varOne[0].myMrn,
                        "trusted": "resource:org.medrex.basic.doctor#" + varOne[4][indexValue].identityDoc,
                        "transactionId": "",
                        "timestamp": new Date()
                    });
            }catch (error) {
                console.log(error);
            }
        }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{recordArray[0].myMrn}</TableCell>
                <TableCell align="center">{recordArray[0].myType}</TableCell>
                <TableCell align="center">{recordArray[0].myMaker}</TableCell>
                <TableCell align="center">{recordArray[0].myDate}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Vitals
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>Body Temperature</TableCell>
                                        <TableCell align='left'>Blood Pressure</TableCell>
                                        <TableCell align='left'>Heart Rate</TableCell>
                                        <TableCell align='left'>Respiratory Rate</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='left'>{recordArray[1].myBt}</TableCell>
                                        <TableCell align='left'>{recordArray[1].myBp}</TableCell>
                                        <TableCell align='left'>{recordArray[1].myHr}</TableCell>
                                        <TableCell align='left'>
                                            {recordArray[1].myRr}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>Medical History</TableCell>
                                        <TableCell align='left'>Medications</TableCell>
                                        <TableCell align='left'>Allergies</TableCell>
                                        <TableCell align='left'>Social History</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='left'>{recordArray[2].myHist}</TableCell>
                                        <TableCell align='left'>{recordArray[2].myMeds}</TableCell>
                                        <TableCell align='left'>{recordArray[2].myAllergies}</TableCell>
                                        <TableCell align='left'>{recordArray[2].mySHist}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                               Summary of EHR
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>Final Assessment</TableCell>
                                        <TableCell align='left'>Plan of Action</TableCell>
                                        <TableCell align='left'>Extra Notes</TableCell>
                                        <TableCell align='left'>Lab Prescribed</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='left'>{recordArray[3].myAssess}</TableCell>
                                        <TableCell align='left'>{recordArray[3].myPlan}</TableCell>
                                        <TableCell align='left'>{recordArray[3].myExtra}</TableCell>
                                        <TableCell align='left'>{recordArray[3].myLab}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Trusted Doctors
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>Doctor Name</TableCell>
                                        <TableCell align='left'></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recordArray[4].map((row, numberDoc) =>
                                        <TableRow key={row.identityDoc}>

                                            <TableCell>{row.nameDoc}</TableCell>
                                            <TableCell><Button color='secondary' onClick={() => {revoke(recordArray,numberDoc)}}>
                                                Revoke Access
                                            </Button></TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable(props) {
    console.log("Comp loaded");
    const [record, setRecord] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    useEffect(async () => {
        console.log("in useEffect");
        let arr2 = [];
        try{
            const emrData = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'queries/returnRecordsOfPatient', {
                params: {
                    patientObject: 'resource:org.medrex.basic.patient#' + props.identity.Id
                }
            });
            let size = emrData.data.length;
            let i;
            for (i=0; i<size; i++){
                const arr1=[];
                try{
                    let myEmr = emrData.data[i];
                    let makerRes = emrData.data[i].maker;
                    let maker = makerRes.substring(33,makerRes.length);
                    const makerRequest = await axios.get(process.env.REACT_APP_NGROK_HTTP + "doctor/"+ maker +
                        "?filter={\"fields\": [ \"fName\",\"lName\"]}");
                    let makerName = makerRequest.data.fName + ' ' + makerRequest.data.lName;
                    let trusted = emrData.data[i].trustedDocs;
                    let trustedSize = emrData.data[i].trustedDocs.length;
                    let j;
                    let objectsDoc = [];
                    for(j=0; j<trustedSize; j++) {
                        try {
                            let trustedRes = trusted[j].substring(33, trusted[j].length);
                            const trustedReq = await axios.get(process.env.REACT_APP_NGROK_HTTP + "doctor/" +
                                trustedRes + "?filter={\"fields\": [ \"fName\",\"lName\"]}");
                            const docDeets = {identityDoc: trustedRes, nameDoc: trustedReq.data.fName + ' ' + trustedReq.data.lName};
                            objectsDoc.push(docDeets);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    const recordDeets = {myMrn: myEmr.mrn, myType: myEmr.type, myMaker:makerName, myDate:myEmr.date};

                    const vitalsDeets = {myBt: myEmr.bt, myBp: myEmr.bp, myHr: myEmr.hr, myRr: myEmr.rr};

                    const pastDeets = {myHist: myEmr.history, myMeds: myEmr.meds, myAllergies: myEmr.allergies,
                        mySHist: myEmr.shist};

                    const sumDeets = {myAssess: myEmr.assessment, myPlan: myEmr.plan, myExtra: myEmr.extra,
                        myLab: myEmr.labs};

                    arr1.push(recordDeets,vitalsDeets,pastDeets,sumDeets,objectsDoc);

                }catch(error){
                    console.log(error);
                }
                arr2.push(arr1);
            }
        }catch(error){
            console.log(error)
        }
        setRecord(record.concat(arr2));

    }, []);

    console.log(record);
    // console.log(vitals);
    // console.log(history);
    // console.log(summary);
    // console.log(accessDocs);


    return (
        <div>
            <h1>Your Electronic Medical Record</h1>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="center">MRN</TableCell>
                            <TableCell align="center">Record Type</TableCell>
                            <TableCell align="center">Date Created</TableCell>
                            <TableCell align="center">Created By</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {record && record.map((recordArray, index) => (
                            <Row key={recordArray[0].myMrn} recordArray={recordArray} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
