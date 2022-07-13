const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/users')
const auth = require('../../middlewares/auth')
const upload = require('../../middlewares/upload')

router.post('/signup', ctrl.register)
router.post('/login', ctrl.login)
router.get('/logout', auth, ctrl.logout)
router.get('/current', auth, ctrl.getCurrent)
router.patch('/subscription', auth, ctrl.updateSubscr)
router.patch('/avatar', auth, upload.single('avatar'), ctrl.updateAvatar)
module.exports = router