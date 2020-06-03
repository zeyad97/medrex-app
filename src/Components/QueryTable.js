import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

export class QueryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorIds: [],
            docs: [],
            creators: [],
            medicalRN: [],
            recType: []
        }
    };

    async componentDidMount() {
        const url = 'http://f944c269c55b.ngrok.io/api/';
        try{
            const response = await axios.get(url+ 'queries/getAccessRequestsForPatient', {
                params: {
                    patientObject: 'resource:org.medrex.basic.patient#'+ this.props.user.participant.Id
                }
            });
            let varZero = response.data[0];
            let i;
            this.state.medicalRN.push(varZero.mrn);
            this.state.recType.push(varZero.type);
            let varOne = varZero.requestDocs;
            let part,usePart;
            for (i=1; i < varOne.length ; i++){
                part = varOne[i];
                usePart = part.substring(33, part.length);
                this.state.doctorIds.push(usePart);
            }
            let varTwo = this.state.doctorIds;
            let value,newValue,j;
            for (j=0; j < varTwo.length; j++ ){
                value = varTwo[j];
            try{
                const getRequests =  await axios.get(url +'doctor/' + value);
                newValue = getRequests.data.fName;
                this.state.docs.push(newValue)
            }catch(error){
                console.log(error);
            }
            }
            let varThree = varZero.maker;
            let ownerToAdd = varThree.substring(33,varZero.maker.length);
            try{
                const getCreator =  await axios.get(url +'doctor/' + ownerToAdd);
                let drCreator = getCreator.data.fName;
                console.log(drCreator);
                this.state.creators.push(drCreator);
            }catch(error){
                console.log(error)
            }
        }catch(error) {
            console.log(error)
        }
        console.log(this.state.doctorIds);
        console.log(this.state.docs);
        console.log(this.state.medicalRN);
        console.log(this.state.recType);
        console.log(this.state.creators);
    }

    render() {
        return (
            <TableContainer component={Paper}>
            <Table stickyHeader  aria-label="sticky table">
            <TableHead>
            <TableRow>
            <TableCell>Id</TableCell>
        <TableCell align="right">Doctor</TableCell>
        <TableCell align="right">Medical Record Number</TableCell>
        <TableCell align="right">Creator</TableCell>
        <TableCell align="right">Type</TableCell>
        <TableCell style={{paddingRight:"60px"}} align="right" >Department</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {
            this.state.doctorIds.map((p, index) => {
                return <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        {p}
                    </TableCell>
                    <TableCell align="right">{p.state.docs}</TableCell>
                    <TableCell align="right">{this.state.medicalRN}</TableCell>
                    <TableCell align="right">{this.state.creators}</TableCell>
                    <TableCell align="right">{this.state.recType}</TableCell>
                </TableRow>
            })
        }
        </TableBody>
        </Table>
        </TableContainer>
    );
    }
}

export default QueryTable;
