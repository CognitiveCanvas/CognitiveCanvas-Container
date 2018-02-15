var express = require('express');
var router = express.Router();

var keywordController = require('../controllers/keywordController');

router.get('/', keywordController.url_list);

router.get('/keyword', keywordController.url_list);

module.exports = router;