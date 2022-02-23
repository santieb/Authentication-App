import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) return res.send(400).json({ msg: 'No token, authorization denied' })

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.send(400).json({ msg: 'Token is not valid' })

      req.user = user
      next()
    })

    next()
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

export default auth
