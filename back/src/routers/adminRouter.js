const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../config/multer.config');
const jwtValidator = require('../middlewares/jwtValidator');

router.post("/book", jwtValidator.adminJWT, upload.single('img'), adminController.addBook);
router.put("/book/:id", jwtValidator.adminJWT, adminController.updateBook);
router.delete("/book/:id", jwtValidator.adminJWT, adminController.deleteBook);

module.exports = router;