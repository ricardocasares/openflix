// dependencies
var router = require('express').Router();
var log = require('debug')('app:routes:views');
// routing
router.get('/:template', renderTemplate);
/**
 * renderTemplate
 * Renders a given template
 *
 * @param  {Object}   req  Request object
 * @param  {Object}   res  Response object
 * @return {Object}        Response object
 */
function renderTemplate(req, res) {
  log('rendering %s.jade', req.params.template);
  return res.render(req.params.template);
}
// exports
module.exports = router;