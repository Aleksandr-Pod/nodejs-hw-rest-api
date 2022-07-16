const User = require('../../models/users')
const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const Joi = require('joi')
const createError = require('../../helpers/error')
const gravatar = require('gravatar')
const { v4 } = require('uuid')
const sendEmail = require('../../helpers/sendEmail')

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(4).required(),
})
const register = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const {error} = joiSchema.validate(req.body)
        if (error) { throw createError(400, error.message) }
        
        const user = await User.findOne({ email })
        if (user) { throw new Conflict(`Email ${email} in use`) }
        
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        const avatar = gravatar.url(email)
        const verificationToken = v4()
        const newUser = await User.create({email, password: hashPassword, avatar, verificationToken})

        const mail = {
            to: email,
            subject: "Email confirmation",
            html: `<h4> Hello dear friend </h4><br/>
            <a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">
            Please, press this to finish verification</a>`
        }
        sendEmail(mail)

        res.status(201).json({
            email: newUser.email,
            subscription: newUser.subscription
        })
    } catch (error) {next(error)}
}

module.exports = register