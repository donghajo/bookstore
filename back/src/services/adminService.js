const db = require('../model/database');

exports.addBook = async (bookInfo) => {
    const result = {
        status: 500,
        msg: "server error",
        data: {},
    };

    await db.query(
        'insert into book(title, author, img, quantity, price, accum) values(?, ?, ?, ?, ?, ?)',
        [
            bookInfo.title,
            bookInfo.author,
            bookInfo.img,
            bookInfo.quantity,
            bookInfo.price,
            bookInfo.price / 10
        ])
        .then(() => {
            result.status = 200;
            result.msg = "add book success";
            result.data = {
                title: bookInfo.title,
                author: bookInfo.author,
                img: bookInfo.img,
                quantity: bookInfo.quantity,
                price: bookInfo.price,
                accum: bookInfo.price / 10
            };
        }).catch((error) => {
            return result;
        });
    return result;
}

exports.update = async (bookInfo) => {
    const result = {
        status: 500,
        msg: "server error",
        data: {},
    };

    await db.query(
        'update book set title = ?, author = ?, quantity = ?, price = ?, accum = ?',
        [
            bookInfo.title,
            bookInfo.author,
            bookInfo.quantity,
            bookInfo.price,
            bookInfo.price / 10
        ]
    )
        .then((data) => {
            result.status = 200;
            result.msg = "update book success";
            result.data = {
                title: data[0].title,
                author: data[0].author,
                quantity: data[0].quantity,
                price: data[0].price,
                accum: data[0].accum
            };
            return result;
        }).catch((error) => {
            return result;
        });
}

exports.deleteBook = async (bookInfo) => {
    const result = {
        status: 500,
        msg: "server error",
        data: {},
    };
    await db.query(
        'delete from book where pid = ?',
        [
            bookInfo
        ]
    )
        .then(() => {
            result.status = 200;
            result.msg = "delete book success";
            return result;
        }).catch((error) => {
            return result;
        })
}