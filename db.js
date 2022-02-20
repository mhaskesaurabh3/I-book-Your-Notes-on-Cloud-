const mongoose = require('mongoose');
const password= process.env.PASSWORD
const mongoURI = 'mongodb+srv://saurabh_m21:'+password+'@cluster0.b1bjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// const mongoURI = 'mongodb://localhost:27017/i-workbook?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const connectToMongo = () =>{
    mongoose.connect(mongoURI , ()=>{
        console.log("Connected To Mongo Successfully")
    } )
}

module.exports = connectToMongo();