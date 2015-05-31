var express = require('express');
var shared = require('../shared/shared.js');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.cookie('auth', shared.getUser().token);
  res.render('index');
});

module.exports = router;
