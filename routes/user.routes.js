import express from 'express'
import userCtrl from '../controllers/user.ctrl'
const router = express.Router()

router.post('/register', userCtrl.register)

export default router