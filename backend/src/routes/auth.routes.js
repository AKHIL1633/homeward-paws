import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { User } from '../models/user.model.js';
import { asyncHandler, HttpError, validate } from '../lib/http.js';
import { authRequired } from '../middleware/auth.js';
import {
  clearSessionCookie,
  safeUser,
  setSessionCookie,
  signToken,
} from '../lib/auth.js';

const router = Router();

const email = z
  .string()
  .email()
  .transform((value) => value.trim().toLowerCase());
const password = z.string().min(8).max(72);

const registerSchema = z.object({
  email,
  password,
  role: z
    .string()
    .transform((value) => value.toUpperCase())
    .pipe(z.enum(['BUYER', 'SELLER'])),
  firstName: z.string().max(60).optional(),
  lastName: z.string().max(60).optional(),
});

const loginSchema = z.object({ email, password });

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const dto = validate(registerSchema, req.body ?? {});
    const existing = await User.findOne({ email: dto.email });
    if (existing) throw new HttpError(409, 'Email already registered');
    const user = await User.create({
      email: dto.email,
      passwordHash: await bcrypt.hash(dto.password, 12),
      role: dto.role,
      firstName: dto.firstName ?? null,
      lastName: dto.lastName ?? null,
    });
    setSessionCookie(res, signToken(user));
    res.status(201).json({ user: safeUser(user) });
  }),
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const dto = validate(loginSchema, req.body ?? {});
    const user = await User.findOne({ email: dto.email });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash)))
      throw new HttpError(401, 'Invalid credentials');
    setSessionCookie(res, signToken(user));
    res.status(200).json({ user: safeUser(user) });
  }),
);

router.post('/logout', (_req, res) => {
  clearSessionCookie(res);
  res.status(204).end();
});

router.get(
  '/me',
  authRequired,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) throw new HttpError(401, 'Invalid or expired session');
    res.json({ user: safeUser(user) });
  }),
);

export default router;
