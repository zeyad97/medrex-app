//called in SearchPatient.js

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import DocAccessTable from "./DocAccessTable";

class SearchResultsTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showEMR: false
        }
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick = (myValue) => {

        this.setState({showEMR: true})
    };


    render (){
        //console.log('intable!', this.props);
        console.log(this.props);
        return (
            <div>
                {this.props.resultsToDisplay.viewResults?
                    <TableContainer component={Paper}>
                            <Table style={{minWidth:'650'}} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">ID</TableCell>
                                        <TableCell align="center">Patient Name</TableCell>
                                        <TableCell align="center">Sex</TableCell>
                                        <TableCell align="center">Date of Birth</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.resultsToDisplay.axiosResults.map((row, valueMy) =>
                                        <TableRow key={row.patId}>
                                            <TableCell align="center">{row.patId}</TableCell>
                                            <TableCell align="center">{row.patName}</TableCell>
                                            <TableCell align="center">{row.patSex}</TableCell>
                                            <TableCell align="center">{row.patAge.substring(0,10)}</TableCell>
                                            <TableCell align="center" onClick={this.onButtonClick}>
                                                <Button variant='contained'>
                                                View EMR</Button>
                                            </TableCell>
                                        </TableRow>
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                : <p> Please enter case sensitive first name, last name or patient id!</p>}
                {this.state.showEMR ?
                    <DocAccessTable record={this.props.resultsToDisplay.axiosResults} doctor={this.props.myDoctor}/> :
                    null
                }
            </div>
        );
    }
}

export default SearchResultsTable;
