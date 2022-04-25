const PORT = 9001;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var fs = require('fs');
const StreamArray = require('stream-json/streamers/StreamArray');
const _ = require("underscore");
const fuzz = require('fuzzball');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log('Listening on port ' + PORT));

// get json file

const jsonData = [];
const jsonStream = StreamArray.withParser();

fs.createReadStream(__dirname + '/part_1.json').pipe(jsonStream.input);

jsonStream.on('data', ({ key, value }) => {
    jsonData.push(value);
});

jsonStream.on('end', () => {
    console.log('All Done');
});

jsonStream.on('error', (error) => {
    console.log('Error: ', error);
});

app.get('/getData', (req, res) => {
    let temp = jsonData.filter(item => item['problem.name'] === req.query.value);
    res.send(temp)
});

app.get('/getSearchBarData', (req, res) => {
    let temp = []
    jsonData.map(item => {
        temp.push(
            {
                label: item['problem.name'],
                relation: item['related.name'],
                type: item['type(r)']
            }
        );
    });
    let data = _.uniq(temp, _.property('label'));
    data = data.filter(obj => fuzz.ratio(obj.label, req.query.inputValue) > 60);
    res.send(data);
});