const mongoose = require("mongoose");
var validatorJs = require("validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require("../../utils/constants");
const Task = require('./tasks')


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
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password
  delete userObject.tokens

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({_id: user._id.toString()}, secret)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

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

  next();
});

// Delete user tasks when user is removed
userSchema.pre('deleteOne', {document: true, query: false}, async function (next){
  try {
    await Task.deleteMany({owner: this._id})
    next()
  } catch (e) {
    console.log(e)
  }
})
const User = mongoose.model("User", userSchema);

module.exports = User