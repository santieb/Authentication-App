import express from 'express'
import userCtrl from '../controllers/user.ctrl'
import auth from '../middlewares/auth'
const router = express.Router()

router.post('/register', auth, userCtrl.register)

router.post('/login', userCtrl.login)

router.post('/resetpassword', userCtrl.resetpassword)

export default router
