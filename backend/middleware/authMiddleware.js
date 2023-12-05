const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async (req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            //obtenemos el token
            token = req.headers.authorization.split(' ')[1]

            //verificar que el token sea correcto
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtenemos los datos del usuario desde el id del payload del jwt
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Acceso no autorizado, no se proporcionó token')
    }

})

module.exports = {
    protect
}


