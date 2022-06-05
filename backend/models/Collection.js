const { trusted } = require("mongoose")

const mongoose = require('mongoose')

const schemaCollections = mongoose.Schema({
    username:{
        type: String, 
        required: true,
    },
    rawgId: {
        type: String, 
        required: true,
    },
    gameName: {
        type: String,
        required:true
    },
    gamePlatform: {
        type: String
    },
    comments: {
        type: String
    }

})

module.exports = mongoose.model('Collections', schemaCollections)