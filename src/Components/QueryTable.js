import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

class QueryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queries: [],
        }
    };

    async componentDidMount() {
        const url = 'http://d7f3cf026b7d.ngrok.io/api/';
        try{
            const response = await axios.get(url+ 'queries/getAccessRequestsForPatient', {
                params: {
                    patientObject: 'resource:org.medrex.basic.patient#'+ '1154517588222789'
                }
            });
            console.log(response);
            let queriesNumber = response.data.length;
            let i;
            for (i=0; i<queriesNumber; i++){
                let varZero = response.data[i].requestDocs;
                let varOne = response.data[i];
                let j,part,newPart;
                for (j=1; j<varZero.length; j++)
                {
                    let docReq = []
                    part = varZero[j];
                    newPart = part.substring(33,part.length);
                    let docCreate = varOne.maker;
                    let docCre = docCreate.substring(33,docCreate.length);
                    try{
                        const doc = await axios.get(url +'doctor/' + newPart);
                        const owner =  await axios.get(url+ 'doctor/' + docCre);
                        const docData = doc.data.fName;
                        const ownerData = owner.data.fName;
                        docReq.push(docData,ownerData);
                    }catch(error){
                        console.log(error);
                    }
                    let medNumber = varOne.mrn;
                    let medType = varOne.type;
                    let assess = varOne.assessment;
                    docReq.push(medNumber,medType, assess);
                    const obj = {docName: docReq[0], maker: docReq[1] , medicalNo:docReq[2], medicalType:docReq[3],
                        shortAssess:docReq[4]}
                    this.state.queries.push(obj);
                    console.log(this.state.queries);}

            }
        }catch(error) {
            console.log(error)
        }
        console.log(this.state.queries);
    }



    render() {
        return (
            <div>
                {this.state.queries}
            <TableContainer component={Paper}>
                <Table style={{minWidth:'650'}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Doctor</TableCell>
                            <TableCell align="center">Created by</TableCell>
                            <TableCell align="center">MRN</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Assessment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.queries.map((row) =>

                            <TableRow key={row.docName}>
                                <TableCell align="center">{row.docName}</TableCell>
                                <TableCell align="center">{row.maker}</TableCell>
                                <TableCell align="center">{row.medicalNo}</TableCell>
                                <TableCell align="center">{row.medicalType}</TableCell>
                                <TableCell align="center">{row.shortAssess}</TableCell>
                            </TableRow>
                       )}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
    );
    }
}

export default QueryTable;
