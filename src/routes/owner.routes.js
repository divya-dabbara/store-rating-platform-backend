import { Router } from 'express';
import {
  getOwnerDashboard,
  getOwnerRatings
} from '../controllers/owner.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isStoreOwner } from '../middleware/role.middleware.js';

const router = Router();

// Protect owner routes with JWT and STORE_OWNER middlewares
router.use(verifyToken, isStoreOwner);

router.get('/dashboard', getOwnerDashboard);
router.get('/ratings', getOwnerRatings);

export default router;
