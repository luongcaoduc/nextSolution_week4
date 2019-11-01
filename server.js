const express = require('express')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config({path: '.env'})
const port = process.env.PORT || 3000

const userRouter = require('./routes/userRouter')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/User', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRouter)

app.listen(port, () => console.log("connect to " + port))




