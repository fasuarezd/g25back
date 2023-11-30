const express = require('express')
const router = express.Router()
const { registrarUser, loginUser, misDatos } = require('../controllers/usersController')

router.post('/', registrarUser)
router.post('/login', loginUser)
router.get('/data', misDatos)

module.exports = router