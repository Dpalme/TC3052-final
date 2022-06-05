const mongoose = require('mongoose')
const schemaCollections = require('../models/Collection')
const { createLog } = require('./log')
const axios = require('axios')

exports.searchGame = async (req, res, next) => {
    console.log('search 1')
    if (req.query.gameName === undefined)
        return next()
    console.log('search 2')
    try {
        const queryResult = await schemaCollections.find({
            username: req.session.user.username,
            gameName: { "$regex": req.query.gameName, "$options": "i" }
        })
        return res.json(queryResult)
    } catch (err) {
        console.error("Error finding games: " + err)
        res.status(500).json({ error: err })
    }
    
}

exports.getCollection = async (req, res) => {
    console.log('get')
    try {
        const collection = await schemaCollections.find({ username: req.session.user.username })
        return res.json(collection)
    } catch (err) {
        console.error('Error getting collection: ' + err)
        res.status(500).json({ error: err })
    }
}

exports.addCollection = async (req, res) => {
    if (req.body.rawgId == undefined)
        return res.status(400).json({ error: 'No game id provided.' })
    try {
        if (req.body.gameName == undefined)
            req.body.gameName = await this.getGameName(req.body.rawgId)
        const newCollection = new schemaCollections({
            username: req.session.user.username,
            rawgId: req.body.rawgId,
            gameName: req.body.gameName,
            gamePlatform: req.body.gamePlatform,
            comments: req.body.comments
        })
        createLog(req.session.user.username, `Added game ${req.body.rawgId} to collection.`)
        await newCollection.save()
        res.status(201).json(newCollection)
    } catch (err) {
        console.error('Error uploading game to collection: ' + err)
        res.status(500).json({ error: err })
    }

}

exports.getGameName = (rawgId) => {
    return new Promise((resolve, reject) => {
        axios.Axios
            .get(`https://api.rawg.io/api/games/${rawgId}?api_key=0c564483a6284c25867f71acbd2ea538`)
            .then(response => {
                resolve(response.data.name)
            })
            .catch(err => {
                reject(err)
            })
    })
}

exports.deleteGame = async (req, res) => {
    if (req.body.rawgId == undefined)
        return res.status(400).json({ error: 'No game id provided.' })
    try {
        const op = await schemaCollections.deleteOne({
            username: req.session.user.username,
            rawgId: req.body.rawgId
        })
        if (op.deletedCount == 0)
            return res.status(404).json({ error: 'Game not found.' })
        createLog(req.session.user.username, `Deleted game ${req.body.rawgId} from collection.`)
        res.status(200).json({ message: 'Game deleted.' })
    } catch (err) {
        console.error('Error uploading game to collection: ' + err)
        res.status(500).json({ error: err })
    }

}

exports.searchGame = async (req, res) => {
    if (req.query.gameName == undefined)
        return res.status(400).json({ error: 'No game name provided.' })
    try {
        const queryResult = await schemaCollections.find({
            username: req.session.user.username,
            gameName: { "$regex": req.query.gameName, "$options": "i" }
        })
        res.json(queryResult)
    } catch (err) {
        console.error("Error finding games: " + err)
        res.status(500).json({ error: err })
    }

}

exports.searchConsole = async (req, res) => {
    try {
        const queryResult = await schemaCollections.find({
            username: req.session.user.username,
            "gamePlatform": { "$regex": req.body.gamePlatform, "$options": "i" }
        })
        res.json(queryResult)
    } catch (err) {
        console.error("Error getting game platforms: " + err)
        res.status(500).json({ error: err })
    }
}