const mongoose = require('mongoose')

const schemaUser = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    registryDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', schemaUser)
