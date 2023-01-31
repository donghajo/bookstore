const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const redisClient = require('../util/redis.util');
const secret = '236979CB6F1AD6B6A6184A31E6BE37DB3818CC36871E26235DD67DCFE4041492';


exports.sign = (user) => {
    const payload = {
        id: user.id,
        role: user.role,
    };

    return jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: '1h',
    });
};

exports.verify = (token) => {
    let decoded = null;
    try {
        decoded = jwt.verify(token, secret);
        return {
            ok: true,
            id: decoded.id,
            role: decoded.role,
        };
    } catch (e) {
        return {
            ok: false,
            msg: e.message,
        };
    }
};

exports.refresh = () => {
    return jwt.sign({}, secret, {
        algorithm: 'HS256',
        expiresIn: '14d',
    });
};

exports.refreshVerify = async (token, userId) => {
    //redis 모듈이 promise를 반환할수있도록
    const getAsync = promisify(redisClient.get).bind(redisClient);

    try {
        const data = await getAsync(userId);
        if (token === data) {
            try {
                jwt.verify(token, secret);
                return true;
            } catch (err) {
                return false;
            }
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};