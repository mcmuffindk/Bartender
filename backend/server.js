const gpio = require('gpio');
const log = require('loggy');
const drinks = require('./static/drinks.json');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1337;

// GPIO
const relay1 = gpio.export(21, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay2 = gpio.export(20, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay3 = gpio.export(26, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay4 = gpio.export(16, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay5 = gpio.export(19, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay6 = gpio.export(13, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay7 = gpio.export(12, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay8 = gpio.export(6, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay9 = gpio.export(5, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay10 = gpio.export(25, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay11 = gpio.export(24, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay12 = gpio.export(23, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay13 = gpio.export(22, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay14 = gpio.export(27, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay15 = gpio.export(18, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});
const relay16 = gpio.export(17, {
  direction: gpio.DIRECTION.OUT,
  ready: function() {
  }
});

// ExpressJS
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
        if (progress < 0) {
          socket.emit('progress', progress);
        } else {
          socket.emit('err', 'Can\'t mix that drink right now');
        }
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
    console.log(drinks[drink]['ingredients']);
    break;
    default:

  }
}
