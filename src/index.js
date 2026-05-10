import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Import routes
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import userRoutes from './routes/user.routes.js';
import ownerRoutes from './routes/owner.routes.js';

// Initial Health Route
app.get('/api/health', (req, res) => {
  res.json({
    message: "Server running"
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api', userRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server and connect to database
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  await connectDB();
});
