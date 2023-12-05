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

    //desestructuramos al body
    const { email, password } = req.body

    //verificamos que exista el usuario
    const user = await User.findOne({ email })

    //verificamos al usuario y a la contraseña
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }

})

const misDatos = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

//funcion para generar un JWT
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30m'
    })
}

module.exports = {
    registrarUser,
    loginUser,
    misDatos
}
