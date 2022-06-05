const router = require('express').Router()

const controllerCollection = require('../controllers/collections')
const { requiresAuth } = require('../middlewares/session')

router.use(requiresAuth)

router.route('/')
    .get(controllerCollection.searchGame, controllerCollection.getCollection)
    .post(controllerCollection.addCollection)
    .delete(controllerCollection.deleteGame)

router.get('/searchConsole', controllerCollection.searchConsole)

module.exports = router