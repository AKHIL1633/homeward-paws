import { Router } from 'express';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { extname, join } from 'node:path';
import { HttpError } from '../lib/http.js';
import { authRequired, sellerOnly } from '../middleware/auth.js';

const uploadDir = process.env.UPLOAD_DIR ?? join(process.cwd(), 'uploads');
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (_req, file, cb) =>
      cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (allowedTypes.has(file.mimetype)) cb(null, true);
    else cb(new HttpError(400, 'Only JPEG, PNG, WebP, or GIF images are allowed'));
  },
});

const router = Router();

router.post('/upload-image', authRequired, sellerOnly, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return next(err instanceof HttpError ? err : new HttpError(400, err.message));
    if (!req.file) return next(new HttpError(400, 'No image uploaded'));
    res.json({ image_url: `/uploads/${req.file.filename}` });
  });
});

export default router;
