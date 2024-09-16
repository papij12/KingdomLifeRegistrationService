// This file was created to test the function for writing the data fetched 
// Unfortunately the writing to an xlsx file test is still failing
// so this file is to keep until further test are ran. 

const xlsx = require('node-xlsx').default;
const fs = require('fs');

// Sample data
const data = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
];

// Write data to Excel
//const worksheet = xlsx.utils.json_to_sheet(data);
const worksheet = xlsx.utils.json_to_sheet(data)
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet1');
xlsx.writeFile(workbook, 'Test.xlsx');

console.log('Excel file created successfully');