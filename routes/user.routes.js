import express from 'express'
const router = express.Router()
import userCtrl from '../controllers/user.ctrl'
import auth from '../middlewares/auth'

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.post('/resetpassword', auth, userCtrl.resetpassword)

router.get('/user', auth, userCtrl.getUserInfo)

router.put('/update', auth, userCtrl.updateUser)

export default router
