const register = require('./register')
const verify = require('./verifyEmail')
const extraVerify = require('./extraVerify')
const login = require('./login')
const logout = require('./logout')
const getCurrent = require('./getCurrentUser')
const updateSubscr = require('./updateSubscr')
const updateAvatar = require('./updateAvatar')

module.exports = {
    register, verify, extraVerify, login, logout, getCurrent, updateSubscr, updateAvatar
}