const User = require('../../models/users')
const createError = require('../../helpers/error')

const verify = async (req, res, next) => {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })
    try {
        if (!user) { createError(404) }
        await User.findByIdAndUpdate(user._id, { verificationToken: null, verified: true })
        res.status(200).json({ message: 'Verification successful' })
    } catch (error) {next(error)}
}

module.exports = verify