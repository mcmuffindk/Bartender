//const GPIO = require('onoff').Gpio
const log = require('loggy');
const drinks = require('./drinks.json');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1337;

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

http.listen(port, log.info(`Bartender App is now running and listening on port ${port}`));






// Socket.io

io.on('connection', (socket) => {
  log.info('Kiosk connected'); // change
  socket.on('drink type', (drink) => {
    log.info('Now mixing', drink);
    var progress = 0;
    do {
      mix(drink, progress, (state) => {
        progress = state;
        socket.emit('progress', progress);
      });
    } while (progress < 100 && progress > -1);
  });
  socket.on('disconnect', () => {
    log.warn('Kiosk disconnected'); // change
  });
});





// Drink mixer

var drink_switch_state = 0; // State of mixer

const mix = (drink, progress, newProgress) => {
  switch (drink_switch_state) {
    case 0:
    if (drinks.hasOwnProperty(drink)) {
      drink_switch_state = 1;
    } else {
      newProgress(-1);
    }
    break;
    case 1:
      drinks[drink]['ingredients']
    break;
    default:

  }
}
