import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

let rows;
rows = [
    createData('Zeyad Ahmed', '25/05/1997', 'zahmed.bese16seecs', 'XXXXXX-XXXXXX-X'),
    createData('Zeyad Ahmed', '25/05/1997', 'zahmed.bese16seecs', 'XXXXXX-XXXXXX-X'),
    createData('Zeyad Ahmed', '25/05/1997', 'zahmed.bese16seecs', 'XXXXXX-XXXXXX-X'),
    createData('Zeyad Ahmed', '25/05/1997', 'zahmed.bese16seecs', 'XXXXXX-XXXXXX-X'),
    createData('Zeyad Ahmed', '25/05/1997', 'zahmed.bese16seecs', 'XXXXXX-XXXXXX-X'),
];

export default function PatientTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow className='tableAlignment'>
                        <TableCell className='tableRow'>Name (full name)</TableCell>
                        <TableCell className='tableRow'>Date of Birth</TableCell>
                        <TableCell className='tableRow'>Email Address</TableCell>
                        <TableCell className='tableRow'>CNIC Number</TableCell>
                        <TableCell className='tableRow'>View Record</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow className='tableAlignment' key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell className='tableRow'>{row.calories}</TableCell>
                            <TableCell className='tableRow'>{row.fat}</TableCell>
                            <TableCell className='tableRow'>{row.carbs}</TableCell>
                            <TableCell className='tableRow'> <Button align="left" variant="contained" color="secondary">
                                Click to view Record
                            </Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
