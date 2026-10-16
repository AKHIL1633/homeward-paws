import 'dotenv/config';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.routes.js';
import petsRoutes from './routes/pets.routes.js';
import uploadsRoutes from './routes/uploads.routes.js';
import { HttpError } from './lib/http.js';

const PORT = Number(process.env.PORT ?? 5000);
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/adoptabuddy';
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000';
const UPLOAD_DIR = process.env.UPLOAD_DIR ?? join(process.cwd(), 'uploads');

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is required');

mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(UPLOAD_DIR));

app.get('/api/health', async (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ status: connected ? 'ok' : 'degraded' });
});

// Uploads is mounted first so POST /api/pets/upload-image is matched before pets.
app.use('/api/pets', uploadsRoutes);
app.use('/api/pets', petsRoutes);
app.use('/api/auth', authRoutes);

app.use((_req, res) => res.status(404).json({ message: 'Not found', statusCode: 404 }));

// Error handler shaped like the previous NestJS responses.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.messages.length > 1 ? err.messages : err.message,
      statusCode: err.status,
    });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error', statusCode: 500 });
});

async function bootstrap() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  app.listen(PORT, '0.0.0.0', () => console.log(`API listening on :${PORT}`));
}

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exitCode = 1;
});
