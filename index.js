//const GPIO = require('onoff').Gpio
const log = require('./log.js');
//const drinks = require('./drinks.json');
const express = require('express');
const app = express();
const port = process.env.PORT || 1337;

express.static(__dirname + 'static');

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.listen(port, log.info(`Bartender App is now running and listening on port ${port}`));