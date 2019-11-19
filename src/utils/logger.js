// TODO: replace console.log, no log in production, error reporting with error
export default class Logger {
  static log(message, ...args) {
    console.log(message, ...args);
  }

  static info(message, ...args) {
    console.log(message, ...args);
  }

  static warn(message, ...args) {
    console.log(message, ...args);
  }

  static error(message, ...args) {
    console.error(message, ...args);
  }
}
