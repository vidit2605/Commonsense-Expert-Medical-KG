import React, { useState, useEffect } from 'react';
import './App.css';
import Searchbar from './components/Seachbar';
// import Table from './components/Table';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Data from './components/Data';

function App() {

  const [inputValue, setInputValue] = useState("");
  const [tableData, setTableData] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async (inputValue) => {
    setShowLoading(true);
    let response = await axios.get(`/getData`, {
      params: {
        value: inputValue.label
      }
    });
    makeTableData(response.data)
  };

  const makeTableData = (data) => {
    let columns = [];
    data.map(item => {
      let c_index = columns.findIndex(element => element.headerName === item['type(r)']);
      if (c_index === -1) {
        columns.push({
          headerName: item['type(r)'], values: []
        })
      }
    });

    columns.map((item, index) => {
      data.map(element => {
        if (element['type(r)'] === item.headerName) {
          columns[index].values.push(element['related.name'])
        }
      })
    });

    setTableData(columns);
    setShowLoading(false);
  };

  useEffect(() => {
    if (inputValue !== "") {
      getData(inputValue);
    };
  }, [inputValue]);

  return (
    <div className="App">
      <div id="div-1">
        <Searchbar setInputValue={setInputValue} />
      </div>
      <div id="div-2">
        <Data inputValue={inputValue} tableData={tableData} />
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default App;
