import express from 'express'
const router = express.Router()
import adminCrtl from '../controllers/admin.crtl'
import auth from '../middlewares/auth'
import isAdmin from '../middlewares/isAdmin'
import userExist from '../middlewares/userExists'

router.get('/users', auth, isAdmin, adminCrtl.getUsersInfo)

router.patch('/users/update/:idUser', auth, isAdmin, userExist, adminCrtl.updateUsersRole)

router.delete('/users/delete/:idUser', auth, isAdmin, userExist, adminCrtl.deleteUser)

export default router
