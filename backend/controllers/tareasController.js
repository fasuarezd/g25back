const getTareas = (req, res) => {
    res.status(200).json({ message: "Obtener Tareas" })
}

const setTareas = (req, res) => {
    res.status(201).json({ message: "Crear Tareas" })
}

const updateTareas = (req, res) => {
    res.status(200).json({ message: `Modificar la tarea número ${req.params.id}` })
}

const deleteTareas = (req, res) => {
    res.status(200).json({ message: `Eliminar la tarea número ${req.params.id}` })
}

module.exports = {
    getTareas,
    setTareas,
    updateTareas,
    deleteTareas
}