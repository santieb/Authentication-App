import express from 'express'
import userCtrl from '../controllers/user.ctrl'
import auth from '../middlewares/auth'
const router = express.Router()

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.post('/resetpassword', auth, userCtrl.resetpassword)

router.get('/user', auth, userCtrl.getUserInfo)

export default router
