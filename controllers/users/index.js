const register = require('./register')
const verify = require('./verifyEmail')
const login = require('./login')
const logout = require('./logout')
const getCurrent = require('./getCurrentUser')
const updateSubscr = require('./updateSubscr')
const updateAvatar = require('./updateAvatar')

module.exports = {
    register, verify, login, logout, getCurrent, updateSubscr, updateAvatar
}