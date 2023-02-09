const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.readCart);
router.post('/:pid', cartController.addCart);

module.exports = router;