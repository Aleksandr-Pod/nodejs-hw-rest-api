// const User = require('../../models/user')

const getCurrentUser = async (req, res) => {
    try {
        res.status(200).json({
            email: req.user.email,
            subscription: req.user.subscription
        })
    } catch (error) {
        
    }

}

module.exports = getCurrentUser