import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(morgan('tiny'))

const URI = process.env.MONGODB_URL

mongoose.connect(
  URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  (err) => {
    if (err) throw err
    console.log('Mongodb connection')
  }
)

import userRoutes from './routes/user.routes'
app.use('/users', userRoutes)

import adminRoutes from './routes/admin.routes'
app.use('/admin', adminRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
