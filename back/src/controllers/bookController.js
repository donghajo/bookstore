const bookService = require('../services/bookService');

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
