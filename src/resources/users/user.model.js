const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true
    },
    login: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      unique: false,
      required: true,
      select: false
    }
  },
  { versionKey: false }
);

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
