const express = require('express')
const { readdirSync } = require('fs')
const connectDB = require('./config/database')
const bodyParse = require('body-parser')

const app = express()

connectDB()

app.use(bodyParse.json({limit:'10mb'}))

readdirSync('./routes')
    .map((r) => app.use('/api', require('./routes/' + r)))

app.listen(5000, () => {
    console.log("Server is running...")
})