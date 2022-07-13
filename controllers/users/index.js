const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrent = require('./getCurrentUser')
const updateSubscr = require('./updateSubscr')
const updateAvatar = require('./updateAvatar')

module.exports = {
    register, login, logout, getCurrent, updateSubscr, updateAvatar
}