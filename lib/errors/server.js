function serverError(msg) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = msg;
  this.name = 'serverError';
  this.status = 500;
  this.code = 1;
};

serverError.prototype.__proto__ = Error.prototype;

module.exports = serverError;