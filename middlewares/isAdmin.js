import Users from '../model/user.model.js'

const isAdmin = async (req, res, next) => {
  try {
    const { id } = req.user
    const user = await Users.findOne({ _id: id })

    if (user.role !== 1) return res.status(500).json({ msg: 'Admin resources access denied' })

    next()
  } catch (err) {
    res.status(500).json({ msg: err })
  }
}

export default isAdmin
