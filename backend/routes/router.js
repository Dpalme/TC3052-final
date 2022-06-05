const { Router } = require('express')
const router = Router()

const routeUsers = require("./users")
const routeCollection = require("./collections")
const routeLog = require('./logs')

router.use('/users', routeUsers)
router.use('/collections', routeCollection)
router.use('/logs', routeLog)

module.exports = router