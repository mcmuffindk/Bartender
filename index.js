const GPIO = require('onoff').Gpio;
const color = require('chalk');
const log = require('./log.js');
//const drinks = require('./drinks.json');
const express = require('express');
const app = express();
const port = process.env.PORT || 1337;


app.listen(port);

log.debug("ABCabc");
log.info("ABCabc");
log.warning("ABCabc");
log.error("ABCabc");