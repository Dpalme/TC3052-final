const schemaUsers = require('../models/User')
const { createLog } = require('./log')

exports.getUser = async (req, res) => {
    if (req.query.username == undefined) return res.status(400).json({ error: 'No username provided.' })
    try {
        const user = await schemaUsers.find({ username: req.query.username })
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.me = async (req, res) => {
    if (req.session.user == undefined) return res.status(401).json({ error: 'Not logged in.' })
    try {
        const user = await schemaUsers.findOne({ username: req.session.user.username })
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}


exports.registerUser = async (req, res) => {
    if (req.body.email == undefined || req.body.username == undefined || req.body.password == undefined)
        return res.status(400).json({ error: 'No email or username or password provided.' })
    try {
        const user = await schemaUsers.findOne({ username: req.body.username })
        if (user != undefined) return res.status(400).json({ error: 'Username already exists.' })
        const email = await schemaUsers.findOne({ email: req.body.email })
        if (email != undefined) return res.status(400).json({ error: 'Email already in use.' })

        const newUser = new schemaUsers({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            registryDate: new Date().toISOString(),
        })
        await newUser.save()
        createLog(newUser.username, 'Registered.')
        res.sendStatus(201)
    } catch (err) {
        console.error("error logging in: " + err)
        res.status(500).json({ status: 500, error: err })
    }
}

exports.login = async (req, res) => {
    if (req.body.username == undefined || req.body.password == undefined)
        return res.status(400).json({ error: 'No username or password provided.' })
    try {
        const user = await schemaUsers.findOne({ username: req.body.username, password: req.body.password })
        
        if (user == undefined) {
            createLog(req.body.username || req.body.email, 'Attempted log in.')
            .catch(err => {
                console.error("error logging in: " + err)
            })
            return res.status(401).json({ status: 400, error: 'Email or password incorrect.' })
        }
        req.session.user = user
        createLog(user.username || req.body.username || req.body.email, 'Logged in.')
        res.cookie('cokkieName','test', { maxAge: 900000, httpOnly: true })
        return res.json(user)
    } catch (err) {
        console.error("error logging in: " + err)
        res.status(500).json({ error: err })
    }
}

exports.logout = async (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
}