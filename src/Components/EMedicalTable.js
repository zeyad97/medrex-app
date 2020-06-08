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


    console.log(props.identity);

    useEffect(async () => {
        console.log("in useEffect");
        const emrData = await axios.get(process.env.REACT_APP_NGROK_HTTP + 'queries/returnRecordsOfPatient', {
            params: {
                patientObject: 'resource:org.medrex.basic.patient#' + props.identity.Id
            }
        });
        let arr0 = [];
        let i,j;
        const dataToCheck = emrData.data;
        for(i=0; i<dataToCheck.length; i++){
            const obj = {mrn:'', recType:'', createdDate:'',createdBy:'', trustedDocs:[], verified:false};
            obj.mrn = dataToCheck[i].mrn;
            obj.recType = dataToCheck[i].type;
            obj.createdDate = dataToCheck[i].date;
            let makerID = dataToCheck[i].maker.substring(33,dataToCheck[i].maker.length);
            const maker = await axios.get(process.env.REACT_APP_NGROK_HTTP +'doctor/' + makerID
                + "?filter={\"fields\": [ \"fName\", \"lName\"]}");
            let makerName = maker.data.fName + ' ' + maker.data.lName;
            obj.createdBy = makerName;
            const objOne = {name:makerName, id:makerID};
            obj.trustedDocs.push(objOne);
            for(j=0; j<dataToCheck[i].trustedDocs.length; j++){
                const objDoc = {name:'', id:''};
                let docID = dataToCheck[i].trustedDocs[j].substring(33,dataToCheck[i].trustedDocs[j].length);
                objDoc.id = docID;
                const docReq = await axios.get(process.env.REACT_APP_NGROK_HTTP +'doctor/' + docID
                    + "?filter={\"fields\": [ \"fName\", \"lName\"]}");
                let docName = docReq.data.fName + ' ' + docReq.data.lName;
                objDoc.name = docName;
                obj.trustedDocs.push(objDoc);
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
    }, []);

    async function verifyRecord(var1) {
        console.log("In verify")
        try{
            const verifyReq = await axios.post(process.env.REACT_APP_NGROK_HTTP + '/verifyRecord',
                {
                    $class: "org.medrex.basic.verifyRecord",
                    record: "resource:org.medrex.basic.healthRecord#"+ var1.mrn,
                    transactionId: "",
                    timestamp: new Date()
                }
            );
            console.log(verifyReq)
            var1.verified = true;
        }catch(error){
            console.log(error);
        }
    }


    console.log(records);

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record.mrn}>
                                <TableCell align="center">{record.mrn}</TableCell>
                                <TableCell align="center">{record.recType}</TableCell>
                                <TableCell align="center">{record.createdDate}</TableCell>
                                <TableCell align="center">{record.createdBy}</TableCell>
                                <TableCell align='center'><EMedicalDialog patientRecord={record}/></TableCell>
                                {record.verified?
                                <TableCell align='center'><CheckIcon/></TableCell>:
                                    <TableCell align='center'>
                                        <Button color='secondary' onClick={()=>verifyRecord(record)}>
                                            Verify</Button></TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
}
