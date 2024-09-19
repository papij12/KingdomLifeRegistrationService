const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
//const xlsx = require('node-xlsx').default;
const xlsx = require('xlsx');
const fs = require('fs');


const app = express();
const port = 3000;


// Middleware to parse JSON bodies
app.use(bodyParser.json());

//Route to fetch data from API and write to Excel
app.post('/Register', async (req, res)=> {

     const{url} = req.body;
     
     if (!url) {
        return res.status(400).send('Bad Request: URL is required');
    }

     try{

        //Append the API key to the URL

        const apiKey = '0ea39f1ee474ee7eb4df5d87c5fbf8e0';
        const fullurl = `${url}&appid=${apiKey}`;

        const response = await axios.get(fullurl);
        const data = response.data;

     
        //write data to Excel
        const Worksheet = xlsx.utils.json_to_sheet([data]);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, Worksheet,'sheet1');
        xlsx.writeFile(workbook, 'Registered.xlsx');


        res.status(200).send('Data fetched successfully');
             
        }

    catch(error){   
         console.error('Error fetching data:', error);
         res.status(500).send('Error fetching data');
     }

});

app.listen(port, () => {

    console.log('server running at http://localhost:${port}');

});

module.exports = app;