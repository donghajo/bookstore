const { verify } = require('../util/jwt.util');

exports.userJWT = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        const result = verify(token);
        if (result.role === 'USER') {
            next();
        } else {
            res.status(401).json({
                ok: false,
                message: result.message,
            });
        }
    }
}

exports.adminJWT = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        console.log(token);

        const result = verify(token);
        console.log(result);

        if (result.role === 'ADMIN') {
            next();
        } else {
            res.status(401).json({
                ok: false,
                message: 'only administrator',
            });
        }
    }
}
