const User = require('../../models/users')
const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const Joi = require('joi')
const createError = require('../../helpers/error')

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(4).required()
})
const register = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const {error} = joiSchema.validate(req.body)
        if (error) { throw createError(400, error.message) }
        
        const user = await User.findOne({ email })
        if (user) { throw new Conflict(`Email ${email} in use`) }
        
        req.body.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        const newUser = await User.create(req.body)     
        res.status(201).json({
            email: newUser.email,
            subscription: newUser.subscription
        })
    } catch (error) {next(error)}
}

module.exports = register