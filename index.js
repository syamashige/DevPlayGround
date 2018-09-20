const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config()


// NOAA API - Datasets
// https://www.ncdc.noaa.gov/cdo-web/webservices/v2




let token = process.env.NOAA_API_KEY;



app.get('/', (req,res) => {
	let startdate = '2010-05-01';
	let enddate = '2010-05-01';
	let url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:28801&startdate=${startdate}&enddate=${enddate}
`;
	axios.get(url, {headers: { 
			token: token
		}
	})
	.then(response => {
		res.json(response.data)
	})
	.catch(err => {
		console.log(err);
		res.json('oh nooooooooo! it brokesh*t')
	})
});




app.listen(9000);

