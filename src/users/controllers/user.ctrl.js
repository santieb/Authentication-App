import Users from '../model/user.model'
import bcript from 'bcrypt'

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

      const passwordHash = await bcript.hash(password, 12)

      const user = new Users({ name, email, passwordHash })
      await user.save()

      res
        .status(200)
        .json({ msg: 'Register sucess! Please activate your email to start' })
    } catch (err) {
      return res.status(505).json({ msg: err.message })
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
