import { Router } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { Pet } from '../models/pet.model.js';
import { asyncHandler, HttpError, validate } from '../lib/http.js';
import { presentPet } from '../lib/present.js';
import { authRequired, optionalAuth, sellerOnly } from '../middleware/auth.js';

const router = Router();

const petBodySchema = z.object({
  name: z.string().max(80),
  species: z.string().max(40),
  breed: z.string().max(80),
  age: z.coerce.number().int().min(0).max(100),
  price: z.coerce.number().min(0),
  description: z.string().max(2000).optional(),
  image_url: z.string().max(500).optional(),
  location: z.string().max(120),
});

const updatePetSchema = petBodySchema.partial();

const findPetsSchema = z.object({
  name: z.string().max(80).optional(),
  species: z.string().max(40).optional(),
  breed: z.string().max(80).optional(),
  location: z.string().max(120).optional(),
  mine: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

const rx = (value) => new RegExp(escapeRegExp(value), 'i');
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function loadOwnedPet(id, userId) {
  if (!mongoose.isValidObjectId(id)) throw new HttpError(404, 'Pet not found');
  const pet = await Pet.findById(id);
  if (!pet) throw new HttpError(404, 'Pet not found');
  if (String(pet.seller) !== String(userId))
    throw new HttpError(403, 'You can only manage your own listings');
  return pet;
}

router.get(
  '/',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const query = validate(findPetsSchema, req.query ?? {});
    const filter = {};
    if (query.mine && req.user) filter.seller = req.user.id;
    if (query.name) filter.name = rx(query.name);
    if (query.species) filter.species = rx(query.species);
    if (query.breed) filter.breed = rx(query.breed);
    if (query.location) filter.location = rx(query.location);

    let q = Pet.find(filter).sort({ createdAt: -1 }).populate('seller', 'email');
    if (query.limit) q = q.limit(query.limit);
    const pets = await q.exec();
    res.json(pets.map(presentPet));
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new HttpError(404, 'Pet not found');
    const pet = await Pet.findById(id).populate('seller', 'email');
    if (!pet) throw new HttpError(404, 'Pet not found');
    res.json(presentPet(pet));
  }),
);

router.post(
  '/',
  authRequired,
  sellerOnly,
  asyncHandler(async (req, res) => {
    const dto = validate(petBodySchema, req.body ?? {});
    const pet = await Pet.create({
      name: dto.name,
      species: dto.species,
      breed: dto.breed,
      age: dto.age,
      price: dto.price,
      description: dto.description ?? null,
      imageUrl: dto.image_url ?? null,
      location: dto.location,
      seller: req.user.id,
    });
    await pet.populate('seller', 'email');
    res.status(201).json(presentPet(pet));
  }),
);

router.put(
  '/:id',
  authRequired,
  sellerOnly,
  asyncHandler(async (req, res) => {
    const dto = validate(updatePetSchema, req.body ?? {});
    const pet = await loadOwnedPet(req.params.id, req.user.id);
    const { image_url, ...rest } = dto;
    Object.assign(pet, rest);
    if (image_url !== undefined) pet.imageUrl = image_url;
    await pet.save();
    await pet.populate('seller', 'email');
    res.json(presentPet(pet));
  }),
);

router.delete(
  '/:id',
  authRequired,
  sellerOnly,
  asyncHandler(async (req, res) => {
    const pet = await loadOwnedPet(req.params.id, req.user.id);
    await pet.deleteOne();
    res.json({ message: 'Pet deleted' });
  }),
);

export default router;
