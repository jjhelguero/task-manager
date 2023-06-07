const mongoose = require("mongoose");
var validatorJs = require("validator");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return validatorJs.isEmail(v);
      },
      message: (props) => `${props.value} is invalid email`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate: {
      validator(v) {
        if (v.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
  },
  age: {
    type: Number,
    default: 1,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: (props) => `${props.value} is invalid age`,
    },
  },
});

userSchema.pre('save', async function (next) {
  const user = this

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})
const User = mongoose.model("User", userSchema);

module.exports = User