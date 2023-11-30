const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor teclea tu nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor teclea tu emial'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea tu password']
    },
    esAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)