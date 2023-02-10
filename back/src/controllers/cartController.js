const cartSerivce = require('../services/cartService');
const { verify } = require('../util/jwt.util');

exports.readCart = async (req, res) => {
    const cartInfo = req.params;
    const result = await cartSerivce.readCart(cartInfo);
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
    };
}

exports.addCart = async (req, res) => {
    const userInfo = verify(req.headers.authorization);
    const bookInfo = {
        id: req.params,
        quantity: req.body.quantity,
        price: req.body.price
    };
    const result = await cartSerivce.readCart(userInfo, bookInfo);
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
    };
}