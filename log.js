const color = require('chalk');

const debug = (msg) => {
  console.log(color.bgBlueBright("Debug: "), color.lightblue(msg));
};

const info = (msg) => {
  console.log(color.bgWhite("Info: "), color.white(msg));
};

const warning = (msg) => {
  console.log(color.bgYellow("Warning: "), color.yellow(msg));
};

const error = (msg) => {
  console.log(color.bgRed("Error: "), color.red(msg));
};

module.exports = {
  debug,
  info,
  warning,
  error
};