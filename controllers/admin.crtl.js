import Users from '../model/user.model.js'

const adminCrtl = {
  getUsersInfo: async (req, res) => {
    try {
      const users = await Users.find().select('-password')

      res.json(users)
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  },
  updateUsersRole: async (req, res) => {
    try {
      const { idUser } = req.params
      const { role } = req.body

      if (!role && role !== 0) return res.status(400).json({ msg: 'Please fill in all fields' })

      if (role !== 1 && role !== 0) return res.status(400).json({ msg: 'Role must be 1 or 0' })

      await Users.findOneAndUpdate(idUser, { role: role })

      res.json({ msg: 'User role successfully changed!' })
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { idUser } = req.params

      await Users.findByIdAndDelete(idUser)

      res.json({ msg: 'User deleted successfully' })
    } catch (err) {
    }
  }
}

export default adminCrtl
