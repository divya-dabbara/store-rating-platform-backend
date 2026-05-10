import { Router } from 'express';
import {
  createUser,
  createStore,
  getDashboardStats,
  getAllUsers,
  getAllStores
} from '../controllers/admin.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/role.middleware.js';

const router = Router();

// Protect all admin routes with JWT and ADMIN role middlewares
router.use(verifyToken, isAdmin);

// Admin functionalities
router.post('/users', createUser);
router.post('/stores', createStore);
router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/stores', getAllStores);

export default router;
