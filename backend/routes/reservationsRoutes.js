const express = require('express')
const reservationsController = require('../controllers/reservationsController')
const router = express.Router()

router.get('/', reservationsController.home)

module.exports = router
