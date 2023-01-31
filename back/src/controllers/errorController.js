const httpStatus = require('http-status-codes');

exports.pageNotFountError = async (req, res) => {
    const errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode} | The page does not exist! `);
};

exports.respondInternalError = async (err, req, res, next) => {
    const errorCode = httpStatus.INTERAL_SERVER_ERROR;
    console.log(`Error occured: ${err.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Syrry, our application is experiencing a problem!`);
};
