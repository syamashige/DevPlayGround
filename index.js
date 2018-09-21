const express = require('express');
const app = express();

// make request to api 
const oReq = new XMLHttpRequest();
const apiURL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/dataset"

// receive data 
// serve the data to the webpage 

app.get('/', (req, res) => {
    res.json('hellooooooo');

    request("load", apiURL, "GET", res => {
        const target = JSON.parse(res.currentTarget.response);
        console.log('target', target);
        console.log('target children', target.data.children);
    })
});

app.listen(8080);