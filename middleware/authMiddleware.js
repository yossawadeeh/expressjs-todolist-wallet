const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.authMiddleware = async (req, res, next) => {
    try{
        let authHeader = req.headers.authorization

        if (authHeader){
            let token = authHeader.split(' ')[1]

            if (!token) {
                res.status(401).send('Invalid token.')
            }

            jwt.verify(token, process.env.JWT_SECREAT, (err, user) => {
                if(err) {
                    return res.status(403).send(err)
                }
                req.user = user;
                next()
            })
        } else{
            res.status(401).send('Token not found.')
        }
    } catch(err) {
        console.log(err)
        res.json(err).status(500)
    }
}