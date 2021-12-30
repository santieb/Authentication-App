import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please, enter your email!"],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Please, enter your password!"],
  },
  role: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
})

export default mongoose.model("Users", userSchema)