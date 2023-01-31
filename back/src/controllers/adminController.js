const adminService = require('../services/adminService');

exports.addBook = async (req, res) => {
    if (!req.body.title || !req.body.author || !req.body.quantity || !req.body.price) {
        res.status(400).send({ status: 400, message: "[fail signup] check : input value " });
        return;
    }

    const bookInfo = {
        title: req.body.title,
        author: req.body.author,
        img: req.file.filename,
        quantity: req.body.quantity,
        price: req.body.price
    }
    const result = await adminService.addBook(bookInfo);

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


exports.updateBook = async (req, res) => {
    if (!req.body.title || !req.body.author || !req.body.quantity || !req.body.price) {
        res.status(400).send({ status: 400, message: "[fail signup] check : input value " });
        return;
    }
    const bookInfo = req.body;
    const result = await adminService.updateBook(bookInfo);
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

exports.deleteBook = async (req, res) => {
    const bookInfo = req.params.id;
    const result = await adminService.deleteBook(bookInfo);
    const { status, msg } = result;
    res.status(status).send({
        status,
        msg,
    });
};