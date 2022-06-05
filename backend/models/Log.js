const mongoose = require('mongoose')

const schemaLog = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{
        type: String, 
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    event: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Event_Log', schemaLog)