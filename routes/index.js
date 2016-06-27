var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getpage', function(req, res, next) {
  fs.writeFile('text.txt', req.query.linkname);
  res.render('index', { result: req.query.linkname });
});

module.exports = router;
