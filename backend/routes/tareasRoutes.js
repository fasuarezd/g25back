const express = require('express')
const router = express.Router()
const { getTareas, setTareas, updateTareas, deleteTareas } = require('../controllers/tareasController')
const { protect } = require('../middleware/authMiddleware')

//router.route('/').get(protect, getTareas).post(protect, setTareas)
router.get('/', protect, getTareas)
router.post('/', protect, setTareas)

//router.route('/:id').delete(protect, deleteTareas).put(protect, updateTareas)
router.put('/:id', protect, updateTareas)
router.delete('/:id', protect, deleteTareas)

module.exports = router