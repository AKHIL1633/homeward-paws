import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from './models/user.model.js';
import { Pet } from './models/pet.model.js';

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/adoptabuddy';

const seller = {
  email: 'caregiver@adoptabuddy.local',
  password: 'DemoPass123!',
  firstName: 'Asha',
  lastName: 'Menon',
};

const pets = [
  { name: 'Mochi', species: 'Dog', breed: 'Golden Retriever', age: 2, price: 4500, location: 'Bengaluru', imageUrl: '/art/pets/mochi.webp', description: 'Gentle, endlessly patient, and happiest with a ball in reach. Mochi walks beautifully on a leash and adores children.' },
  { name: 'Luna', species: 'Cat', breed: 'Tabby', age: 1, price: 2000, location: 'Mumbai', imageUrl: '/art/pets/luna.webp', description: 'A curious, soft-spoken tabby who loves sunny windowsills and will quietly follow you from room to room.' },
  { name: 'Rocky', species: 'Dog', breed: 'Labrador', age: 3, price: 5000, location: 'Delhi', imageUrl: '/art/pets/rocky.webp', description: 'Big heart, bigger energy. Rocky is house-trained, knows his basic commands, and would thrive with an active family.' },
  { name: 'Simba', species: 'Cat', breed: 'Domestic Shorthair', age: 2, price: 1800, location: 'Pune', imageUrl: '/art/pets/simba.webp', description: 'A confident orange companion who greets everyone at the door and purrs the moment you sit down.' },
  { name: 'Bella', species: 'Dog', breed: 'Beagle', age: 1, price: 3800, location: 'Hyderabad', imageUrl: '/art/pets/bella.webp', description: 'A playful beagle pup with a nose for adventure. Bella is crate-trained and loves meeting other dogs at the park.' },
  { name: 'Coco', species: 'Other', breed: 'Holland Lop Rabbit', age: 1, price: 1200, location: 'Chennai', imageUrl: '/art/pets/coco.webp', description: 'A calm, litter-trained rabbit who enjoys gentle handling and a quiet corner with fresh hay.' },
  { name: 'Shadow', species: 'Dog', breed: 'Siberian Husky', age: 3, price: 6000, location: 'Shimla', imageUrl: '/art/pets/shadow.webp', description: 'A striking, high-energy husky who loves long hikes and cool weather. Shadow does best with experienced owners and plenty of space to run.' },
  { name: 'Miso', species: 'Cat', breed: 'Domestic Shorthair Kitten', age: 1, price: 1500, location: 'Kolkata', imageUrl: '/art/pets/miso.webp', description: 'A tiny, playful kitten full of curiosity. Miso is litter-trained and loves chasing feather toys before curling up in your lap.' },
  { name: 'Nugget', species: 'Dog', breed: 'Pug', age: 2, price: 4200, location: 'Ahmedabad', imageUrl: '/art/pets/nugget.webp', description: 'A cheerful, affectionate pug who snorts happily and follows you everywhere. Nugget is great with kids and apartment life.' },
  { name: 'Pixel', species: 'Dog', breed: 'Pembroke Welsh Corgi', age: 1, price: 7000, location: 'Jaipur', imageUrl: '/art/pets/pixel.webp', description: 'A bright, bouncy corgi pup with short legs and a big personality. Pixel is quick to learn tricks and loves being the center of attention.' },
  { name: 'Kiwi', species: 'Other', breed: 'Indian Ringneck Parrot', age: 2, price: 3500, location: 'Goa', imageUrl: '/art/pets/kiwi.webp', description: 'A clever, colourful parrot who whistles tunes and mimics words. Kiwi needs an attentive home with daily interaction and enrichment.' },
  { name: 'Pepper', species: 'Dog', breed: 'Shih Tzu', age: 4, price: 4800, location: 'Lucknow', imageUrl: '/art/pets/pepper.webp', description: 'A sweet, low-energy lapdog who adores gentle company and grooming sessions. Pepper is perfect for a calm, loving household.' },
];

async function main() {
  await mongoose.connect(MONGODB_URI);
  const passwordHash = await bcrypt.hash(seller.password, 12);

  const user = await User.findOneAndUpdate(
    { email: seller.email },
    {
      $set: { role: 'SELLER', firstName: seller.firstName, lastName: seller.lastName },
      $setOnInsert: { email: seller.email, passwordHash },
    },
    { new: true, upsert: true },
  );

  // Idempotent: reset this seller's listings before re-inserting.
  await Pet.deleteMany({ seller: user._id });
  await Pet.insertMany(pets.map((pet) => ({ ...pet, seller: user._id })));

  console.log(`Seeded ${pets.length} pets for ${seller.email}`);
  console.log(`Demo seller login -> email: ${seller.email}  password: ${seller.password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
