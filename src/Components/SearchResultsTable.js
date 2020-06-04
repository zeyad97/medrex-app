//called in SearchPatient.js

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class SearchResultsTable extends React.Component {
    constructor(props){
        super(props);
    }

    render (){
        //console.log('intable!', this.props);
        return (
            <div>
                {this.props.resultsToDisplay.viewResults?
                    <TableContainer component={Paper}>
                            <Table style={{minWidth:'650'}} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Patient Name</TableCell>
                                        <TableCell align="center">Sex</TableCell>
                                        <TableCell align="center">Age</TableCell>
                                        <TableCell align="center">ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.resultsToDisplay.axiosResults.map((row) =>

                                        <TableRow key={row.patId}>
                                            <TableCell align="center">{row.patName}</TableCell>
                                            <TableCell align="center">{row.patSex}</TableCell>
                                            <TableCell align="center">{row.patAge}</TableCell>
                                            <TableCell align="center">{row.patId}</TableCell>
                                        </TableRow>
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                : <p> Please enter case sensitive first name, last name or patient id!</p>}
            </div>
            
        );
    }
}

export default SearchResultsTable;