import 'dotenv/config'
import express from 'express'
const app = express()

app.get('/', (req, res, next) => {

  res.json({ msg: "hello world" })
})

const PORT = process.env.PORT
app.listen(PORT, () =>
  console.log(`listening on port ${PORT}`)
)