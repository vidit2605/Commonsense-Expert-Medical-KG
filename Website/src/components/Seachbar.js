import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import AsyncSelect from 'react-select/async';

const Searchbar = (props) => {
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);

    const handleChange = (value) => {
        props.setInputValue(value);
    };

    // const getSearbarData = () => {
    //     setTimeout(() => {
    //         axios.get('/getSearchBarData').then(res => {
    //             setSearchData(res.data);
    //         }).catch(err => console.log('Error: ', err));
    //     }, 1000 * 1);
    // };

    const getSearbarData = (inputValue, callback) => {
        setTimeout(() => {
            axios.get('/getSearchBarData', {
                params: {
                    inputValue: inputValue
                }
            }).then((data) => {
                callback(data.data);
            }).catch(err => console.log('Error: ', err));
        }, 1000);
    };

    useEffect(() => {
        if (!data.length) {
            getSearbarData();
        }
    }, []);

    return (
        <AsyncSelect
            width='300px'
            value={value}
            loadOptions={getSearbarData}
            placeholder="Search..."
            onChange={(e) => {
                handleChange(e);
            }}
            defaultOptions
            cacheOptions
        />
    )
};

export default Searchbar;