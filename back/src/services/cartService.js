const db = require('../model/database');

exports.readCart = async (userInfo) => {
    const result = {
        status: 500,
        msg: "server error",
        data: {},
    };
    await db.query(
        'select * from cart where user_id = ?',
        userInfo
    ).then(async (data) => {
        const cartInfo = await db.query(
            'select * from cart_detail c left join book b on c.book_pid where pid = ? ',
            data[0].pid);
        result.status = 200;
        result.msg = 'read cart success';
        result.data = cartInfo;
    }).catch((error) => {
        console.log(error);
        result.msg = 'fail query!';
    });
    return result;
};

exports.addCart = async (userInfo, bookInfo) => {
    const result = {
        status: 500,
        msg: "server error",
        data: {},
    };
    const now = new Date();

    await db.query(
        'insert into cart(create_date, user_id) values(?, ?)',
        now,
        userInfo
    ).then(async () => {
        const cart = await db.query(
            'select pid from cart where user_id = ?',
            userInfo
        );
        await db.query(
            'insert into cart_detail(cart_pid, book_pid, quantity, price) values(?,?,?,?)',
            cart[0].pid,
            bookInfo.id,
            bookInfo.quantity,
            bookInfo.price
        );

    }).catch((error) => {
        console.log(error);
        result.msg = 'fail query!';
    })

};