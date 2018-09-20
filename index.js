const express = require('express');
const app = express();
const axios = require('axios');


// LIST OF API's
// https://github.com/toddmotto/public-apis


app.get('/', (req,res) => {
	axios.get('https://aws.random.cat/meow')
	.then(response => {
		let page = `<img src=${response.data.file}></img>`
		res.send(page);
	})
	.catch(err => {
		res.json('oh nooooooooo! it brokesh*t')
	})
});




app.listen(9000);