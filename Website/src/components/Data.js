import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Data = (props) => {

    return (
        <div className='table-wrapper'>
            {
                props.inputValue.label && props.tableData ?
                    <React.Fragment>
                        <div id="selected-option">
                            <h2>{props.inputValue.label.toUpperCase()}</h2>
                        </div>
                        <div id="content">
                            {Object.keys(props.tableData).map((item, index) => {
                                return (
                                    <div id="table" key={index}>
                                        <h3>{props.tableData[item].headerName}</h3>
                                        <ul>
                                            {props.tableData[item].values.map(value => <li>{value}</li>)}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </React.Fragment>
                    :
                    <div id="please-select">
                        <h2>Please select an option from above</h2>
                    </div>
            }

        </div>
    )
};

export default Data;