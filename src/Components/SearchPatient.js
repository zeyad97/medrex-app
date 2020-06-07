//call it from wherever it doesn't need any props. It contains the search bar and search function.
//table is in SearchResultsTable.js

import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import SearchResultsTable from './SearchResultsTable';
import {Theme as theme} from "@material-ui/core/styles/createMuiTheme";
import {Button, Grid} from "@material-ui/core";

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

            <div style={{flexGrow: '1'}}>
                <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item xs={6}>
                        <InputBase
                            placeholder="Search…"
                            id="filled-search"
                            type="search"
                            variant="filled"
                            inputProps={{'aria-label': 'Search patient'}}
                            inputComponent={this.searchTerm}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => this.getSearchResults()} variant='contained' color='primary'
                                endIcon={<SearchIcon/>}>
                            Search</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchResultsTable resultsToDisplay={this.state} myDoctor={this.props}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default SearchPatient;
