import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false // Don't include password in queries by default
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', function(next) {
  // Skip if password is not modified
  if (!this.isModified('password')) {
    return next();
  }
  
  // Hash the password
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => {
      next(err);
    });
});

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;

