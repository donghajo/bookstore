const userService = require('../services/userService');

exports.addUser = async (req, res) => {
    if (!req.body.id || !req.body.pwd || !req.body.nickname || !req.body.zipcode || !req.body.defaultAddress || !req.body.detailAddress) {
        res.status(400).send({ status: 400, message: "[fail signup] check : input value " });
        return;
    }
    const userInfo = req.body;
    const result = await userService.addUser(userInfo);
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

exports.login = async (req, res) => {
    if (!req.body.id || !req.body.pwd) {
        res.status(400).send({ status: 400, message: "[fail signup] check : input value " });
        return;
    }
    const userInfo = req.body;
    const result = await userService.login(userInfo);
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




