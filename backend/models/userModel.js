import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // enteredPassword is the password that the user entered
  // this.password is the password of the user
};
// pre means it will work before saving the user
userSchema.pre('save', async function (next) {
  // if the password is not modified, then we don't need to do anything, just call next piece of middleware
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
