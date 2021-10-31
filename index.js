const express = require('express');
var cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(cors());

const EXTERNAL_API_URL =
	'https://api.weatherapi.com/v1/forecast.json?key=3738897fde7047f0a1822737203011&q=20171&days=1';

app.get('/', (req, res) => {
	res.end('Vivsoft Test - Weather Backend API running!');
});

app.get('/weather-data', (req, res) => {
	axios
		.get(`${EXTERNAL_API_URL}/weather-data`)
		.then(function (response) {
			const { current, forecast } = response.data;
			const { forecastday } = forecast;
			const { hour } = forecastday[0];
			const weatherResponse = {
				current: {
					temp_f: current.temp_f,
				},
				forecast: hour.map((h) => {
					return {
						time: new Date(h.time_epoch * 1000).toLocaleTimeString('en-IN'),
						temp_f: h.temp_f,
					};
				}),
			};
			res.json(weatherResponse);
		})
		.catch(function (error) {
			res.json('Error occured while fetching weather-data!');
		});
});

app.listen(port, () => {
	console.log(`Weather Backend API listening at http://localhost:${port}`);
});
