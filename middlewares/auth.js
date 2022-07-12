const createError = require('../helpers/error')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers
    const [bearer, token] = authorization.split(" ")
    try {
        if (bearer !== "Bearer") {
            throw createError(401)
        }
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(id)
        if (!user || !user.token) { throw createError(401) }
        req.user = user
        next()
    } catch (error) {
        if (error.message === "invalid signature") {
            error.status = 401
        }
        next(error)
    }
}
module.exports = auth