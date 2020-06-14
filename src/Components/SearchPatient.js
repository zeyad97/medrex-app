//call it from wherever it doesn't need any props. It contains the search bar and search function.
//table is in SearchResultsTable.js
//doctor component used to search patients

import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import SearchResultsTable from './SearchResultsTable';
import {Button, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

class SearchPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            axiosResults: [],
            viewResults: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    async getSearchResults() {
        try {
            const response = await axios.get(process.env.REACT_APP_NGROK_HTTP +
                'queries/searchPatientsByFnameLnameOrPid', {
                params: {
                    String: this.state.searchTerm
                },
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY
                }
            });
            console.log(response);
            //clear the results array
            this.state.axiosResults = [];
            let i, varOne, responseLength = response.data.length;
            //only bother if the response has some data
            if (responseLength !== 0) {
                for (i = 0; i < responseLength; i++) {
                    varOne = response.data[i];
                    const obj = {
                        patName: varOne.fName + ' ' +
                            varOne.lName, patSex: varOne.sex, patAge: varOne.dob, patId: varOne.pId
                    }
                    this.state.axiosResults = [];
                    this.state.axiosResults.push(obj);
                    console.log(this.state.axiosResults);
                }
                this.state.viewResults = "true";
            } else {
                //ensure nothing is shown
                this.state.viewResults = "false";
            }

        } catch (error) {
            console.log(error)
            this.state.viewResults = "false";
        }
        this.setState({axiosResults: this.state.axiosResults, viewResults: this.state.viewResults});
        //this.setState({viewResults:this.state.viewResults});
    }

    handleChange(event) {
        //console.log('handlechangefn',event.target.value);
        //necessary for getsearchresults fn to work
        this.setState({searchTerm: event.target.value});
    }

    /*const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const classes = useStyles();
*/

    render() {
        return (
            <div>
                <h1>Patient search</h1>
                <Grid container spacing={3}>
                    <Grid container justify='center' alignItems='center' item xs={12} spacing={3}>
                        <Grid item>
                            <TextField
                                placeholder="Search.."
                                type="search"
                                variant="outlined"
                                fullWidth
                                inputComponent={this.searchTerm}
                                onChange={this.handleChange}
                                color='secondary'
                            />
                        </Grid>
                        <Grid item>
                            <Button onClick={() => this.getSearchResults()} variant='contained' color='secondary'
                                    endIcon={<SearchIcon/>}>
                                Search</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify='center' alignItems='center' item xs={12}>
                        <SearchResultsTable resultsToDisplay={this.state} myDoctor={this.props}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default SearchPatient;
