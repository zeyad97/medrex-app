//call it from wherever it doesn't need any props. It contains the search bar and search function.
//table is in SearchResultsTable.js

import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {Grid} from "@material-ui/core";
import axios from 'axios';
import SearchResultsTable from './SearchResultsTable';

class SearchPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            axiosResults: [],
            viewResults : false
        };
        this.handleChange = this.handleChange.bind(this);       
    }

    async getSearchResults() {
        const url = ' http://0d0a157b5c62.ngrok.io/api/';
            try{
                const response = await axios.get(url+ 'queries/searchPatientsByFnameLnameOrPid', {
                    params: {
                        String: this.state.searchTerm
                    }
                });
                console.log(response);
                //clear the results array
                this.state.axiosResults = [];
                let i, varOne, responseLength = response.data.length;
                //only bother if the response has some data
                if (responseLength !== 0){
                    for (i=0; i<responseLength; i++){
                        varOne = response.data[i];
                        const obj = {patName: varOne.fName + ' ' + varOne.lName , patSex: varOne.sex , patAge:varOne.dob, patId:varOne.pId}
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
        this.setState({axiosResults:this.state.axiosResults,viewResults:this.state.viewResults});
        //this.setState({viewResults:this.state.viewResults});
    }

    handleChange (event) {
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
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
    render () {
       return (
            
            <div>
                <div className='root' >
                    <div className='search'>
                        <div className={SearchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            //classes={{
                            //    root: classes.inputRoot,
                            //    input: classes.inputInput,
                            //}}
                            inputProps={{ 'aria-label': 'Search patient' }}
                            inputComponent = {this.searchTerm}
                            onChange = {this.handleChange}
                        />
                    </div>
                    <button className="search" onClick={() => this.getSearchResults()} >Search</button>
                </div>
                <SearchResultsTable resultsToDisplay ={this.state}/> 
            </div>
            
        );
    }
}

export default SearchPatient;
