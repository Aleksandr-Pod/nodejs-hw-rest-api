const createError = require('../../helpers/error')
const User = require('../../models/users')

const patchSubscr = async (req, res, next) => {
    try {
        const {id} = req.user
        const { subscription } = req.body
        if (subscription !== "starter" & subscription !== "pro" & subscription !== "business") {
            throw createError(400)
        }
        const result = await User.findByIdAndUpdate(id, { subscription }, {new: true})
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = patchSubscr