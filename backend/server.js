const gpio = require('gpio');
const log = require('loggy');
const config = require('./config.js');
const drinks = require('./static/drinks.json');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || config.port;

// GPIO
const relay1 = gpio.export(config.relay1, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay2 = gpio.export(config.relay2, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay3 = gpio.export(config.relay3, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay4 = gpio.export(config.relay4, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay5 = gpio.export(config.relay5, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay6 = gpio.export(config.relay6, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay7 = gpio.export(config.relay7, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay8 = gpio.export(config.relay8, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay9 = gpio.export(config.relay9, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay10 = gpio.export(config.relay10, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay11 = gpio.export(config.relay11, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay12 = gpio.export(config.relay12, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay13 = gpio.export(config.relay13, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay14 = gpio.export(config.relay14, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay15 = gpio.export(config.relay15, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});
const relay16 = gpio.export(config.relay16, {
  direction: gpio.DIRECTION.OUT,
  ready: () => {
  }
});

// Bind ingredients to pumps
const pump_bindings = {
  [config.ingredient1]: relay1,
  [config.ingredient2]: relay2,
  [config.ingredient3]: relay3,
  [config.ingredient4]: relay4,
  [config.ingredient5]: relay5,
  [config.ingredient6]: relay6,
  [config.ingredient7]: relay7,
  [config.ingredient8]: relay8,
  [config.ingredient9]: relay9,
  [config.ingredient10]: relay10,
  [config.ingredient11]: relay11,
  [config.ingredient12]: relay12,
  [config.ingredient13]: relay13,
  [config.ingredient14]: relay14,
  [config.ingredient15]: relay15,
  [config.ingredient16]: relay16
}

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
    checkDrink(drink, (res) => {
      if (res) {
        socket.emit('res', "success"); // Change text
      } else {
        socket.emit('res', "failed"); // Change text
      }
    });
  });
  socket.on('disconnect', () => {
    log.warn('Kiosk disconnected'); // change
  });
});





// Drink mixer

// Check if drink exists and if all ingredients are available
const checkDrink = (drink, res) => {
  if (drinks.hasOwnProperty(drink)) {
    var valid = 1;
    for (var i = 0; i <= Object.keys(drinks[drink]['ingredients']).length; i++) {
      if (i < Object.keys(drinks[drink]['ingredients']).length) {
        if (!pump_bindings.hasOwnProperty(ingredient)) {
          valid = 0;
        }
      } else {
        if (valid) {
          mix(drink, (response) => {
            res(response)
          });
        } else {
          res(-1);
        }
      }
    }
  }
}


const mix = (drink, response) => {
  var suc = 1;
  var i = 1;
  $.each(drinks[drink]['ingredients'], (ingredient, volume) => {

    if (i < Object.keys(drinks[drink]['ingredients']).length) {
      pump(ingredient, volume, (res) => {
        suc = res;
      });
    }

    if (i = Object.keys(drinks[drink]['ingredients']).length) {
      pump(ingredient, volume, (res) => {
        suc = res;
        response(suc);
      });
    }

    i++;
  })
}


const pump = (ingredient, volume, res) => {
  pump_bindings[ingredient].set(1); // Start pump
  console.log(pump_bindings[ingredient]);
  setTimeout(() => {
    pump_bindings[ingredient].set(0); // Stop pump
    console.log(pump_bindings[ingredient]);
    res(1);
  }, volume * config.volMillis);
}
