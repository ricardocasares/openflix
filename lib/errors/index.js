var log = require('debug')('app:errors');
/**
 * logErrors
 * @param  {Error}    err  Error instance
 * @param  {Object}   req  Request object
 * @param  {Object}   res  Response object
 * @param  {Function} next Next callback
 * @return {Function}      Next callback
 */
exports.logErrors = function logErrors(err, req, res, next) {
  console.error(err.stack);
  return next(err);
};
/**
 * notFound
 * Handles not found errors
 * @param  {Error}    err  Error object
 * @param  {Request}  req  Request object
 * @param  {Response} res  Response object
 * @param  {Function} next Next callback
 * @return {Function}      Next callback
 */
exports.notFound = function(req, res) {
  log('404 %s', req.path);
  var msg = {
    error: {
      msg: 'Resource not found',
      code: 0,
      status: 404
    }
  };
  res.json(msg);
};
/**
 * defaultHandler
 * Default error handler
 *
 * @param  {Error}    err  Error object
 * @param  {Request}  req  Request object
 * @param  {Response} res  Response object
 * @param  {Function} next Next callback
 * @return {Response}        Response object
 */
exports.defaultHandler = function defaultHandler(err, req, res, next) {
  log('error handled -> %s, stackTrace -> %s', err.message, err.stack);
  var msg = {
    error: {
      msg: err.message || 'Something went really wrong...',
      code: err.code,
      status: err.status || 500,
      stack: err.stack || 'test'
    }
  };
  res.status(err.code || 500);
  res.json(msg);
};