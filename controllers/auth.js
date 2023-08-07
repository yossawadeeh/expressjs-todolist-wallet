const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const constant = require('../constant/errorMessgae')

exports.register = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).send('User is exist.')
        }

        const salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(req.body.password, salt)
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        })
        await newUser.save()

        res.status(200).send(newUser)
    } catch(err) {
        console.log(err)
        res.status(500).send(constant.INTERNAL_SERVER_ERROR)
    }
}

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body
        let user = await User.findOne({email: email})
        if (user){
            let isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(401).send('Email or password is incorrect.')
            } else{
                let payload = {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                }

                jwt.sign(payload, process.env.JWT_SECREAT, {expiresIn: '24h'}, (err, token) => {
                    if (err){
                        throw err
                    }
                    res.status(200).json({
                        token: token,
                        data: payload
                    })
                })
            }
        } else{
            return res.status(404).send('User does not exist.')
        }
    } catch(err) {
        console.log(err)
        res.status(500).send(constant.INTERNAL_SERVER_ERROR)
    }
}