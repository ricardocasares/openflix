// exports
module.exports = serverError;
/**
 * serverError
 * Represents an error occured on the server
 *
 * @param  {String} msg Error message
 */
function serverError(msg) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = msg;
  this.name = 'serverError';
  this.status = 500;
  this.code = 1;
}
// use the Error prototype
serverError.prototype.__proto__ = Error.prototype;