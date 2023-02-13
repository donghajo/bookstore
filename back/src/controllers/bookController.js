const bookService = require('../services/bookService');
const { verify } = require('../util/jwt.util');

exports.readBookList = async (req, res) => {
    const result = await bookService.readBookList();
    if (result.status == 200) {
        const { status, msg, data } = result;
        res.status(status).send({
            status,
            msg,
            data,
        });
    } else {
        const { status, msg } = result;
        res.status(status).send({
            status,
            msg,
        });
    }
};

exports.readBook = async (req, res) => {
    const bookInfo = req.params.bookid;
    const result = await bookService.readBook(bookInfo);
    if (result.status == 200) {
        const { status, msg, data } = result;
        res.status(status).send({
            status,
            msg,
            data,
        });
    } else {
        const { status, msg } = result;
        res.status(status).send({
            status,
            msg,
        });
    }
};

exports.orderBook = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send({
            status: 400,
            msg: '[fail] please login'
        });
    }
    const now = new Date();
    const userInfo = verify(req.headers.authorization);
    const orderInfo = [now, req.body.amount, req.body.zipcode, req.body.default_address, req.body.detail_address, req.body.card_kind, req.body.expiradate, req.body.card_code, userInfo.id];

    const result = await bookService.orderBook(userInfo, orderInfo);
    if (result.status == 200) {
        const { status, msg, data } = result;
        res.status(status).send({
            status,
            msg,
            data,
        });
    } else {
        const { status, msg } = result;
        res.status(status).send({
            status,
            msg,
        });
    }
};

exports.addReview = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send({
            status: 400,
            msg: '[fail] please login'
        });
    }
    const userInfo = verify(req.headers.authorization);
    const bookInfo = req.params.bookid;
    const reviewInfo = req.body;
    const result = await bookService.addReview(userInfo, bookInfo, reviewInfo);
    res.status(result.status).send({
        status: result.status,
        msg: result.msg,
    });
};

exports.deleteReview = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send({
            status: 400,
            msg: '[fail] please login'
        });
    }
    const userInfo = verify(req.headers.authorization);
    const bookInfo = req.params.bookid;
    const result = await bookService.deleteReview(userInfo, bookInfo);
    res.status(result.status).send({
        status: result.status,
        msg: result.msg,
    });
};