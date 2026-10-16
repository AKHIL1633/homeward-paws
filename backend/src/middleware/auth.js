import { HttpError } from '../lib/http.js';
import { SESSION_COOKIE, verifyToken } from '../lib/auth.js';

// Populates req.user when a valid session cookie is present; never throws.
export function optionalAuth(req, _res, next) {
  const token = req.cookies?.[SESSION_COOKIE];
  if (token) {
    try {
      req.user = verifyToken(token);
    } catch {
      req.user = undefined;
    }
  }
  next();
}

// Requires a valid session; 401 otherwise.
export function authRequired(req, _res, next) {
  const token = req.cookies?.[SESSION_COOKIE];
  if (!token) throw new HttpError(401, 'Authentication required');
  try {
    req.user = verifyToken(token);
  } catch {
    throw new HttpError(401, 'Invalid or expired session');
  }
  next();
}

// Requires the authenticated user to be a seller; 403 otherwise.
export function sellerOnly(req, _res, next) {
  if (req.user?.role !== 'SELLER') throw new HttpError(403, 'Seller access required');
  next();
}
