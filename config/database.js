const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_HOST)
        console.log("Database is connected..")
    } catch(err) {
        throw err
    }
}

module.exports = connectDB