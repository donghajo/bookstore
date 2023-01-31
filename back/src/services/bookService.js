const db = require('../model/database');

exports.readBookList = async () => {
    const result = {
        status: 500,
        msg: "server error",
        data: {},
    };
    await db.query(
        'select * from book'
    ).then((data) => {
        result.status = 200;
        result.msg = "success read book list";
        result.data = data[0];
    })
        .catch((error) => {
            result.msg = "fail query";
        });
    return result;
}