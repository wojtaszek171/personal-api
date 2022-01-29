const jwt = require('express-jwt');
const config = require('../config.js');
const db = require('src/_helpers/db');

module.exports = authorize;

function authorize(noThrowError = false) {
    return [
        jwt({ secret: config.secret, algorithms: ['HS256'], credentialsRequired: !noThrowError }),

        async (req, res, next) => {
            if (!req.user && noThrowError) {
                return next();
            }

            const user = await db.User.findByPk(req.user.sub);

            if (!user) {
                user = false;
                return res.status(401).json({ message: 'Unauthorized' });
            }

            req.user = user.get();
            next();
        }
    ];
}

