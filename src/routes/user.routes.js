import { Router } from 'express';
import {
  getStores,
  submitRating,
  updateRating
} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isUser } from '../middleware/role.middleware.js';

const router = Router();

// Stores can be viewed by any logged-in user
router.get('/stores', verifyToken, getStores);

// Ratings operations are restricted to USER role
router.post('/ratings', verifyToken, isUser, submitRating);
router.put('/ratings/:id', verifyToken, isUser, updateRating);

export default router;
