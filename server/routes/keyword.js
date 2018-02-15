var express = require('express');
var router = express.Router();

var keywordController = require('../controllers/keywordController');

router.get('keyword/:keyword', keywordController.url_list);

module.exports = router;