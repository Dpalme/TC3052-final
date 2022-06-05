const router = require('express').Router()
const controllerLog = require('../controllers/log')
const { requiresAuth } = require('../middlewares/session')

router.use(requiresAuth)
router.get('/', controllerLog.getLog)

module.exports = router