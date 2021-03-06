//used to display EMRs of a particular patient after a doctor searches for a patient
//doctor only component

import React, {useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import {Button} from "@material-ui/core";
import EMedicalDialog from "./EMedicalDialog";
import Skeleton from "@material-ui/lab/Skeleton";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import RevokeAccessDialog from "./RevokeAccessDialog";
const axios = require('axios');

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function EMedicalTable(props) {
    const classes = useStyles();
    const [records,setRecords]= useState([]);
    const [loading, setLoading] = React.useState(true);
    const [openSnack, setSnack] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info')


    console.log(props.identity);

    async function fetchData(myValue){
        const emrData = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'queries/returnRecordsOfPatient', {
            params: {
                patientObject: 'resource:org.medrex.basic.patient#' + myValue
            },
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
              }
        });
        let arr0 = [];
        let i,j;
        const dataToCheck = emrData.data;
        for(i=0; i<dataToCheck.length; i++){
            const obj = {mrn:'', recType:'', createdDate:'',createdBy:'', trustedDocs:[], reqDocs:[],
                verified:false};
            obj.mrn = dataToCheck[i].mrn;
            obj.recType = dataToCheck[i].type;
            obj.createdDate = dataToCheck[i].date;
            let makerID = dataToCheck[i].maker.substring(33,dataToCheck[i].maker.length);
            const maker = await axios.get(process.env.REACT_APP_NGROK_HTTP +'doctor/' + makerID
                + "?filter={\"fields\": [ \"fName\", \"lName\"]}",
                {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                      }
                });
            let makerName = maker.data.fName + ' ' + maker.data.lName;
            obj.createdBy = makerName;
            const objOne = {name:makerName, id:makerID};
            obj.trustedDocs.push(objOne);
            for(j=0; j<dataToCheck[i].trustedDocs.length; j++){
                const objDoc = {name:'', id:''};
                let docID = dataToCheck[i].trustedDocs[j].substring(33,dataToCheck[i].trustedDocs[j].length);
                objDoc.id = docID;
                const docReq = await axios.get(process.env.REACT_APP_NGROK_HTTP +'doctor/' + docID
                    + "?filter={\"fields\": [ \"fName\", \"lName\"]}",
                    {
                        headers: {
                            'x-api-key': process.env.REACT_APP_API_KEY
                          }
                    });
                let docName = docReq.data.fName + ' ' + docReq.data.lName;
                objDoc.name = docName;
                obj.trustedDocs.push(objDoc);
            }
            let y;
            for(y=1; y<dataToCheck[i].requestDocs.length; y++){
                const objDoc = {name:'', id:''};
                let docID = dataToCheck[i].requestDocs[y].substring(33,dataToCheck[i].requestDocs[y].length);
                objDoc.id = docID;
                const docReq = await axios.get(process.env.REACT_APP_NGROK_HTTP +'doctor/' + docID
                    + "?filter={\"fields\": [ \"fName\", \"lName\"]}",
                    {
                        headers: {
                            'x-api-key': process.env.REACT_APP_API_KEY
                        }
                    });
                let docName = docReq.data.fName + ' ' + docReq.data.lName;
                objDoc.name = docName;
                obj.reqDocs.push(objDoc);
            }
            if(dataToCheck[i].verified === 'true'){
                obj.verified = true;
            }
            console.log(obj);
            arr0.push(obj);
            console.log(arr0);
        }
        setRecords(arr0);
        setLoading(false);
    }

    useEffect( () => {
        fetchData(props.identity.pId);
    }, [props.identity.pId]);

    async function verifyRecord(var1) {
        console.log("In verify")
        setSeverity('info');
        setSnack(true);
        setMessage('Verifying record#'+var1.mrn)
        try{
            const verifyReq = await axios.post(process.env.REACT_APP_NGROK_HTTP + 'verifyRecord',
                {
                    $class: "org.medrex.basic.verifyRecord",
                    record: "resource:org.medrex.basic.healthRecord#"+ var1.mrn,
                    transactionId: "",
                    timestamp: new Date()
                },
                {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                      }
                }
            );
            console.log(verifyReq)
            setSnack(false);
            var1.verified = true;
            setSeverity('success');
            setSnack(true);
            setMessage('Verified record # '+var1.mrn)

        }catch(error){
            console.log(error);
        }
        setSnack(false);
    }

    console.log(records);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnack(false);
    }


    return (
        loading?
            <div>
                <Skeleton variant="text" />
                <Skeleton variant="rect"/>
            </div>:
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">MRN</TableCell>
                            <TableCell align="center">Record Type</TableCell>
                            <TableCell align="center">Date Created</TableCell>
                            <TableCell align="center">Created By</TableCell>
                            <TableCell align="center">Action</TableCell>
                            <TableCell align='center'>Verification</TableCell>
                            <TableCell align='center'>Trusted Docs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record,recordNum) => (
                            <TableRow key={record.mrn}>
                                <TableCell align="center">{record.mrn}</TableCell>
                                <TableCell align="center">{record.recType}</TableCell>
                                <TableCell align="center">{record.createdDate.substring(0,10)}</TableCell>
                                <TableCell align="center">{record.createdBy}</TableCell>
                                <TableCell align='center'><EMedicalDialog patientRecord={record}/></TableCell>
                                {record.verified?
                                <TableCell align='center'><CheckIcon/></TableCell>:
                                    <TableCell align='center'>
                                        <Button color='secondary' onClick={()=>verifyRecord(record,recordNum)}>
                                            Verify</Button></TableCell>}
                                    <TableCell align='center'><RevokeAccessDialog patient={record}/></TableCell>
                                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                                          open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity={severity}>
                                        {message}
                                    </Alert>
                                </Snackbar>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>


    );
}
