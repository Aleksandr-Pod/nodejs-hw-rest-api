const User = require('../../models/users')

const logout = async (req, res) => {
    try {
        const { _id } = req.user
        await User.findByIdAndUpdate(_id, { token: null })
        res.status(204).json({message: "logout successfull"})
    } catch (error){
        
    }

}

module.exports = logout