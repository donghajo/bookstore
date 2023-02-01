const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.readBookList);
router.get('/book/:pid', bookController.readBook);

module.exports = router;