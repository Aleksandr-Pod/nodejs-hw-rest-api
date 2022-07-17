const createError = require('../../helpers/error')
const User = require('../../models/users')
const sendEmail = require('../../helpers/sendEmail')

const extraVerify = async (req, res, next) => {
    const {email} = req.body
    try {
        if (!email) {
            throw createError(400, "missing required field - email")
        }
        // находим пользователя в БД
        const user = await User.findOne({ email })
        console.log("user:", user)
        if (!user) throw createError(404)
        if (user.verified) throw createError(400, "Verification has already been passed")
        
        const mail = {
            to: email,
            subject: "Email confirmation",
            html: `<h4> Hello dear friend </h4><br/>
            <p>You have been registered but not verified.</P>
            <a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">
            Please, press this to finish verification</a>`
        }
        sendEmail(mail)
        res.status(200).json({
            "message": "Verification email sent"
        })
    } catch (error) { next(error) }
}

module.exports = extraVerify