const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    password: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        validate(value) {
            if ( value.length <  7 || value.includes("password")) {

                throw new Error("Password must be greater than 6 characters and must not contain the word 'password'!")

            }            
            
        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if ( !validator.isEmail(value) ) {
                throw new Error('Email is not valid')
            }
        },
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if ( value < 0 ) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})


module.exports = User
