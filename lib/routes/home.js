// dependencies
var router = require('express').Router();
var log = require('debug')('app:routes:home');
// routing
router.get('/', index);
/**
 * index
 * Renders home page
 *
 * @param  {Object}   req  Current request
 * @param  {Object}   res  Response
 * @return {Response}      Response
 */
function index(req, res) {
  log('serving index');
  res.render('index');
}
// exports
module.exports = router;