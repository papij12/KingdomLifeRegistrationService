const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const xlsx = require('node-xlsx');
const fs = require('fs');


const app = express();
const port = 3000;


// Middleware to parse JSON bodies
app.use(bodyParser.json());

//Route to fetch data from API and write to Excel
app.post('/fetch-data', async (req, res)=> {

    const{url} = req.body;

    try{

        const response = await axios.get(url);
        const data = response.data;

        // write data to Excel
        const Worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, Worksheet,'sheet1');
        xlsx.writeFile(workbook, 'Registerd.xlsx');

        res.send('Data fetched and written to Registerd.xlsx');
    }

    catch(error){
        Console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }


});

app.listen(port, () => {

    console.log('server running at http://localhost:${port}');

});