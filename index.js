const express = require('express');
const app = express();
const baseem = require('baseem');
const DarkSky = require('dark-sky')
require('dotenv').config()
const darksky = new DarkSky(process.env.DARKSKY_API_KEY);
const beaufort = require('beaufort')
const options = {unit: 'kmh', getName: true};
const axios = require('axios');


const degToCompass = (val_num) => {
    let num = parseInt(val_num);
    let val = Math.floor((num / 22.5) + 0.5);
    let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

// sample api request -> http://localhost:9000/2017/3/21.308714/-157.808782/8
app.get('/', (req, res) => {
	let lat = 21.282;
	let lng = -157.661
	axios.get(`https://api.darksky.net/forecast/${darksky.apiKey}/${lat},${lng}`)
	.then(response => {

		res.json(response.data);
	}).catch(err => {
		res.json('its probably raining...')
	})
})

app.listen(9000);


