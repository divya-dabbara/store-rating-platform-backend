import pool from '../db/index.js';
import {
  getOwnerDashboardQuery,
  getOwnerRatingsQuery
} from '../db/owner.queries.js';

export const getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const stats = await pool.query(getOwnerDashboardQuery, [ownerId]);
    
    res.status(200).json({
      message: 'Owner dashboard statistics retrieved',
      dashboard: stats.rows
    });
  } catch (error) {
    console.error('Owner dashboard error:', error);
    res.status(500).json({ message: 'Server error while fetching owner dashboard' });
  }
};

export const getOwnerRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const ratings = await pool.query(getOwnerRatingsQuery, [ownerId]);
    
    res.status(200).json({
      message: 'Store ratings retrieved',
      ratings: ratings.rows
    });
  } catch (error) {
    console.error('Owner ratings error:', error);
    res.status(500).json({ message: 'Server error while fetching owner ratings' });
  }
};
