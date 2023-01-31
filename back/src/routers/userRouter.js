const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const refreshController = require('../util/refresh.util');

//회원가입
router.post("/signup", userController.addUser);

//로그인
router.post("/login", userController.login);

//토큰 재발급
router.get("/refresh", refreshController.refresh);


module.exports = router;