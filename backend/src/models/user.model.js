import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['BUYER', 'SELLER'], default: 'BUYER' },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
