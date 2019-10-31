const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secretKey')
        const user = await User.findOne({ _id: decoded._id})
        
        if (!user)
            throw new Error()

        //req.user = user
        next()
    } catch (e) {
        res.send(e)
    }
} 

module.exports = auth
