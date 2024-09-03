const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('node-xlsx');
const fs = require('fs');


const app = express();
app.use(bodyParser.json());

//req: is the request object, which contains info about the HTTP request, including any data sent by the client
// res: This is the response object, which is used to send a response back to the client 
// set up a POST route at the /save endpoint.
app.post('/save',(req, res)=> {

    // retrieves the JSON data sent in the request body.
    // the body-parse middleware parses the incoming request body and makes the data available under the req.body property.
    const data = req.body;

    // Create a new worksheet

    const worksheet = xlsx.build([{name: 'sheet1', data: data}]);

    // write the worksheet to a file

    fs.writeFileSync('data.xlsx', worksheet);


    res.send('Data saved to Excel file!');
});