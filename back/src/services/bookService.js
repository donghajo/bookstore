const db = require('../model/database');
const { verify } = require('../util/jwt.util');
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

exports.readBook = async (bookInfo) => {
    const result = {
        status: 500,
        msg: "server error",
        data: {},
    };
    await db.query(
        'select * from book where pid = ?',
        bookInfo
    ).then(async (data) => {
        const review = await db.query(
            'select * from review where book_pid = ?',
            bookInfo
        );
        result.status = 200;
        result.msg = 'success read book detail';
        result.data = {
            book: data[0][0],
            review: review[0]
        };
    }).catch((error) => {
        console.log(error);
        result.msg = 'fail query';
    });
    return result;
}

exports.orderBook = async (req) => {
    const result = {
        status: 500,
        msg: "server error",
        data: {},
    };
    const now = new Date();
    const userInfo = verify(req.headers.authorization);
    const orderInfo = [now, req.body.amount, req.body.zipcode, req.body.default_address, req.body.detail_address, req.body.card_kind, req.body.expiradate, req.body.card_code, userInfo.id];

    await db.query(
        `insert into orders(order_date, amount, zipcode, default_address, detail_address, card_kind, card_expiradate, card_code, user_id) values (?,?,?,?,?,?,?,?,?)`,
        orderInfo,
    ).then(async () => {
        const order = await db.query(`select * from orders where user_id = ? order by pid desc limit 1`, userInfo.id);
        const orDetailInfo = [order[0][0].pid, Number(req.params.pid), req.body.quantity, req.body.amount];
        await db.query(
            'insert into order_detail(order_pid, book_pid, quantity, price) values(?, ?, ?, ?)',
            orDetailInfo
        );
        result.status = 200;
        result.msg = "order success";
        result.data = order[0];
    }).catch((error) => {
        console.log(error);
        result.msg = 'fail query!';
    });
    return result;
};