import mongoose from 'mongoose';

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true, min: 0, max: 100 },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: null },
    imageUrl: { type: String, default: null },
    location: { type: String, required: true },
    status: { type: String, enum: ['AVAILABLE', 'PENDING', 'ADOPTED'], default: 'AVAILABLE' },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  { timestamps: true },
);

petSchema.index({ species: 1 });
petSchema.index({ createdAt: -1 });

export const Pet = mongoose.model('Pet', petSchema);
