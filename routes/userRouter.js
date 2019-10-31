const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const auth = require('../middlewares/auth')


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send(error)
    }
    
})

router.get('/users', auth, async (req, res) => {
    try {
        const user = await User.find({})
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        console.log(token)
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router
