import Users from '../model/user.model.js'

const userExists = async (req, res, next) => {
  try {
    const { idUser } = req.params

    const user = await Users.findOne({ _id: idUser })

    if (!user) return res.status(400).json({ msg: 'This user does not exist' })

    next()
  } catch (err) {
    res.status(500).json({ msg: err })
  }
}

export default userExists
