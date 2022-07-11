const User = require('../../models/user')
const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')

const register = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            throw new Conflict(`Email ${email} in use`)
        }
        req.body.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        const newUser = await User.create(req.body)     
        res.status(201).json({
            email: newUser.email,
            subscription: newUser.subscription
        })
    } catch (error) {next(error)}
}

module.exports = register