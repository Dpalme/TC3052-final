const schemaLog = require('../models/Log')
const mongoose = require('mongoose')

exports.getLog = async (req, res) => {
    if (req.query.gteDate != undefined || req.query.ltDate != undefined)
        return this.dateLog(req, res)
    if (req.query.event != undefined)
        return this.userSearchLog(req, res)
    return this.userLog(req, res)
}

exports.createLog = async (username, message) => {
    console.log(username, message)
    try {
        const newLog = new schemaLog({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            event: message,
            date: new Date().toISOString()
        })
        newLog.save()
    } catch (err) {
        console.error("error logging in: " + err)
    }
}

exports.userLog = async (req, res) => {
    try {
        const queryResult = await schemaLog.find({ username: req.session.user.username })
        res.json(queryResult)
    } catch (err) {
        console.error("Error getting user log. " + err)
        res.status(500).json({ error: err })
    }
}

exports.dateLog = async (req, res) => {
    try {
        const queryResult = await schemaLog.find({
            username: req.session.user.username,
            date: {
                "$gte": req.body.gteDate,
                "$lt": req.body.ltDate
            }
        })
        res.json(queryResult)
    } catch (err) {
        console.error("Error finding logs in date range: " + err)
        res.status(500).json({ error: err })
    }
}

exports.userSearchLog = async (req, res) => {
    try {
        const queryResult = await schemaLog.find({
            username: req.session.user.username,
            event: { "$regex": req.body.event, "$options": "i" }
        })
        res.json(queryResult)
    } catch (err) {
        console.error('Error in user search log. ' + err)
        res.status(500).json({ error: err })
    }

}