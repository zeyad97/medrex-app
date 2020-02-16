import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
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
                    <TableRow>
                        <TableCell>Name (full name)</TableCell>
                        <TableCell align="right">Date of Birth</TableCell>
                        <TableCell align="right">Email Address</TableCell>
                        <TableCell align="right">CNIC Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
