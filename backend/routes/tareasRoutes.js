const express = require('express')
const router = express.Router()
const { getTareas, setTareas, updateTareas, deleteTareas } = require('../controllers/tareasController')

router.route('/').get(getTareas).post(setTareas)
//router.get('/', getTareas)
//router.post('/', setTareas)

router.route('/:id').delete(deleteTareas).put(updateTareas)
//router.put('/:id', updateTareas)
//router.delete('/:id', deleteTareas)

module.exports = router