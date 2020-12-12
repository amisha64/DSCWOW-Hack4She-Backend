const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
    lat: String,
    lng: String,
    date: String,
    time: String,
})

module.exports = mongoose.model('reportList', reportSchema)