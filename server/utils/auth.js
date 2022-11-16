
// IMPORTS
const jwt = require('jsonwebtoken');
require('dot-env');


// JWT SETTINGS
const secret = process.env.JWT_SECRET || 'test secret phrase';
const expiration = '2h';


// EXPORTS
module.exports = {
    authMiddleware({req}){
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization)  // In the HTTP header, shave off the word 'Bearer' at the beginning of the value
            token = token
                .split(' ')
                .pop()
                .trim();

        if (!token)
            return req;
        
        try{
            const {data} = jwt.verify(
                token,
                secret,
                {maxAge: expiration}
            );
            req.user = data;
        }catch{
            console.log('Invalid Token');
        }

        return req;
    },

    signToken({username, email, _id}){
        const payload = {username, email, _id};
        return jwt.sign(
            {data: payload},
            secret,
            {expiresIn: expiration}
        );
    }
};