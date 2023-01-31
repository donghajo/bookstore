const jwt = require('../util/jwt.util');
const db = require('../model/database');

exports.addUser = async (userInfo) => {
    const result = {
        status: 500,
        msg: "server error",
        data: {},
    };
    let isIdExist = false;
    //validate id already exists
    await db.query(
        'select * from user where id = ?',
        userInfo.id
    )
        .then((data) => {
            console.log(data[0]);

            if (data[0].length) {
                isIdExist = true;
                result.status = 400;
                result.msg = "id already exist";
            }
        })
        .catch((e) => {
            result.msg = 'fail query!';
        });

    if (!isIdExist) {
        // insert query
        await db.query(
            'insert into user(id, pwd, nickname) values (?, ?, ?)',
            [
                userInfo.id,
                userInfo.pwd,
                userInfo.nickname
            ]
        )
            .then(() => {
                //address add query
                db.query(
                    'insert into address(zipcode, default_address, detail_address, user_id) values(?, ?, ?, ?)',
                    [
                        userInfo.zipcode,
                        userInfo.defaultAddress,
                        userInfo.detailAddress,
                        userInfo.id
                    ]
                );
                // jwt 
                const user = {
                    id: userInfo.id,
                    role: "USER",
                };
                const accessToken = jwt.sign(user);
                const refreshToken = jwt.refresh();
                console.log("accessToken >>> ", accessToken);
                console.log("refreshToken >>> ", refreshToken);

                result.status = 200;
                result.msg = "signup success";
                result.data = {
                    accessToken,
                    refreshToken
                };
            })
            .catch((e) => {
                result.msg = 'fail query!';
            });
    }
    return result;
};

exports.login = async (userInfo) => {
    const result = {
        status: 500,
        msg: "server error",
        data: {},
    };
    await db.query(
        'select * from user where id = ? and pwd = ?',
        [
            userInfo.id,
            userInfo.pwd
        ]
    )
        .then((data) => {
            if (data[0].length) {
                const user = {
                    id: userInfo.id,
                    role: data[0][0].role,
                };
                const accessToken = jwt.sign(user);
                const refreshToken = jwt.refresh();
                console.log("accessToken >>> ", accessToken);
                console.log("refreshToken >>> ", refreshToken);

                result.status = 200;
                result.msg = "login success";
                result.data = {
                    accessToken,
                    refreshToken
                };
            } else {
                result.status = 401;
                result.msg = "login fail >>> please check id or password";
            }
        }).catch((e) => {
            result.msg = 'fail query!';
        });
    return result;

}