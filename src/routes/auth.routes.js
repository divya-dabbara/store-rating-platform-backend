import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Example of a protected route using JWT and Role middleware
// This is just to demonstrate how the middlewares work together
router.get('/me', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

router.get('/admin-only', verifyToken, checkRole(['ADMIN']), (req, res) => {
  res.json({ message: 'Welcome Admin!', user: req.user });
});

export default router;
