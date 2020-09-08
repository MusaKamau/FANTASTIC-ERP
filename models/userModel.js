const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'PLese tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    default: 'freelancer',
    enum: ['freelancer', 'client', 'admin', 'staff'],
  },
  bio: {
    type: String,
    trim: true,
  },
  skills: [String],
  language: [String],
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //This only works on create and save!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  PasswordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//Document middleware
userSchema.pre('save', async function (next) {
  // only run this function if passowrd is modified
  if (!this.isModified('password')) return next();

  // Encrypt or hash the password
  // Either use a cost parameter or you can salt the hash
  this.password = await bcrypt.hash(this.password, 12);
  // Delete the passwordConfirm
  this.passwordConfirm = undefined;
  next();
});

// instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// checking if the user changed the password
userSchema.methods.changedPasswordsAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }

  //False means NOT changed
  return false;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
