const mysql = require("mysql2");
const dbConfig = require('../config/db.config.json');

const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
});

pool.getConnection(function (err, connenction) {
    if (err) {
        console.log("DB connect fail : ", err);
    } else {
        console.log("DB connect success");
        connenction.release();
    }
});



module.exports = pool.promise();