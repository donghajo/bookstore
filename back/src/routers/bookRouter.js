const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.readBookList);
router.get('/book/:bookid', bookController.readBook);
router.post('/book/:bookid', bookController.orderBook);
router.post('/review/:bookid', bookController.addReview);

module.exports = router;