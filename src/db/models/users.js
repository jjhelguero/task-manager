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
    unique: true,
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

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})
  if(!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})
const User = mongoose.model("User", userSchema);

module.exports = User