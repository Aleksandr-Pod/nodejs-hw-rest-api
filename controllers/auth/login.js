const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Conflict} = require('http-errors')

const login = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) { 
            throw new Conflict(`User ${email} not found`)
        }
        const passCheck = bcrypt.compareSync(password, user.password)
        if (!passCheck) { throw new Conflict('pass is incorrect') }
        // const { SECRET_KEY } = process.env
        const payload = { id: user._id }
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        res.status(200).json({
            message: "success",
            token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = login