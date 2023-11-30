const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const registrarUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Faltan datos favor de verificar")
    }

    //verificar si ese usuario ya existe
    const userExiste = await User.findOne({ email })
    if (userExiste) {
        res.status(400)
        throw new Error("Ese usuario ya existe en la base de datos, favor de verificar")
    }

    //hash al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //crear el nuevo usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.esAdmin
        })
    } else {
        res.status(400)
        throw new Error("No se pudieron guardar los datos")
    }

})

const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Usuario logeado' })
})

const misDatos = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Datos del Usuario' })
})

module.exports = {
    registrarUser,
    loginUser,
    misDatos
}