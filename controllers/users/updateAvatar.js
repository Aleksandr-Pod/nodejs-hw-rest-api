const User = require('../../models/users')
const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const patchAvatar = async (req, res) => {
    const { path: tempPath, originalname } = req.file
    const newAvatarName =  `${req.user._id}-${originalname}`
    const avatarPath = path.join(__dirname, "../../", "public", "avatars", newAvatarName)
    Jimp.read(tempPath)
        .then(img => img.resize(250, 250).write(avatarPath))
        .catch(console.log)
    try {
        await fs.unlink(tempPath)
        const avatarURL = path.join("public", "avatars", newAvatarName)
        await User.findByIdAndUpdate(req.user._id, { avatarURL })
        res.status(200).json({
            message: "avatar img updated",
            avatarURL
        })
    } catch (error) {
        await fs.unlink(tempPath)
    }

}

module.exports = patchAvatar