import pool from '../db/index.js';
import {
  getStoresWithRatingsQuery,
  createRatingQuery,
  checkExistingRatingQuery,
  updateRatingQuery
} from '../db/user.queries.js';

export const getStores = async (req, res) => {
  try {
    const { search } = req.query;
    const userId = req.user ? req.user.id : null; // Ensure JWT middleware has set req.user

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const query = getStoresWithRatingsQuery(search);
    const params = search ? [userId, `%${search}%`] : [userId];
    
    const stores = await pool.query(query, params);
    
    res.status(200).json({
      message: 'Stores retrieved successfully',
      stores: stores.rows
    });
  } catch (error) {
    console.error('Get stores error:', error);
    res.status(500).json({ message: 'Server error while fetching stores' });
  }
};

export const submitRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;
    const userId = req.user.id;

    if (!store_id || !rating) {
      return res.status(400).json({ message: 'store_id and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if user already rated this store
    const existing = await pool.query(checkExistingRatingQuery, [userId, store_id]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'You have already rated this store. Please use the update endpoint.' });
    }

    const newRating = await pool.query(createRatingQuery, [userId, store_id, rating]);
    
    res.status(201).json({
      message: 'Rating submitted successfully',
      rating: newRating.rows[0]
    });
  } catch (error) {
    console.error('Submit rating error:', error);
    res.status(500).json({ message: 'Server error while submitting rating' });
  }
};

export const updateRating = async (req, res) => {
  try {
    const { id } = req.params; // rating id
    const { rating } = req.body;
    const userId = req.user.id;

    if (!rating) {
      return res.status(400).json({ message: 'rating is required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const updatedRating = await pool.query(updateRatingQuery, [rating, id, userId]);
    
    if (updatedRating.rows.length === 0) {
      return res.status(404).json({ message: 'Rating not found or you do not have permission to update it' });
    }

    res.status(200).json({
      message: 'Rating updated successfully',
      rating: updatedRating.rows[0]
    });
  } catch (error) {
    console.error('Update rating error:', error);
    res.status(500).json({ message: 'Server error while updating rating' });
  }
};
