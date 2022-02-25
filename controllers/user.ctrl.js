import Users from '../model/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userCrtl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password)
        return res.status(400).json({ msg: 'Please fill in all fields' })

      if (!validateEmail(email))
        return res.status(400).json({ msg: 'Invalid email' })

      const userExist = await Users.exists({ email: email })
      if (userExist)
        return res.status(400).json({ msg: 'This email already exists' })

      if (password.length < 6)
        return res.status(400).json({ msg: 'Password must be at least 6 characters' })

      const passwordHash = await bcrypt.hash(password, 12)

      const user = new Users({ name, email, password: passwordHash })
      await user.save()

      res.status(200).json({ msg: 'Register sucess!' })
    } catch (err) {
      return res.status(505).json({ msg: err })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      if (!email || !password) return res.status(400).json({ msg: 'Please fill in all fields' })

      const user = await Users.findOne({ email })
      if (!user) return res.status(400).json({ msg: 'This email does not exist' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: 'Password is incorrect' })

      const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' })
      console.log(token)
      res.status(200).json({ msg: 'Login sucess!' })
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  },
  resetpassword: async (req, res) => {
    try {
      const { password, newPassword } = req.body
      const { id } = req.user

      if (!password || !newPassword) return res.status(400).json({ msg: 'Please fill in all fields' })

      const user = await Users.findById(id)

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: 'Password is incorrect, you can not change your password' })

      const newPasswordHash = await bcrypt.hash(newPassword, 12)
      await Users.findOneAndUpdate({ _id: id }, { password: newPasswordHash })

      res.json({ msg: 'Password successfully changed!' })
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const { id } = req.user

      const user = await Users.findById(id).select('-password -_id -createdAt -updatedAt -__v')
      res.json(user)
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  }
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export default userCrtl
