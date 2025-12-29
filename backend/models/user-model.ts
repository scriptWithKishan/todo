import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: String
})

const User = mongoose.model('User', UserSchema)

export default User