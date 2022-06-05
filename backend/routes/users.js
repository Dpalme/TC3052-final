const router = require('express').Router()
const controllerUsers = require('../controllers/users')
const { requiresAuth } = require('../middlewares/session')

router.route('/')
    .get([requiresAuth, controllerUsers.getUser])
    .post(controllerUsers.registerUser)

router.post('/login', controllerUsers.login)
router.post('/logout', controllerUsers.logout)
router.get('/me', controllerUsers.me)

module.exports = router
