const mongoose = require("mongoose")
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: path.resolve(__dirname,"../../.env")})

module.exports.connectDB = async() =>{
    await mongoose.connect(process.env.MONGO_URI)
}