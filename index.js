import "dotenv/config"
import express from "express"
import mongoose from 'mongoose'
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//database
const URI = process.env.MONGODB_URL

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }, (err) => {
    if(err) throw err
    console.log('Mongodb connection')
})

//routes
import userRoutes from './routes/user.routes'
app.use('/users', userRoutes)

app.get("/", async (req, res, next) => {
  res.json({ msg: "hello world"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`listening on port ${PORT}`))