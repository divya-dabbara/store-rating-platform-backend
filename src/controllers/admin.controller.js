import bcrypt from 'bcryptjs';
import pool from '../db/index.js';
import { getUserByEmailQuery } from '../db/queries.js';
import {
  createUserAdminQuery,
  createStoreQuery,
  getDashboardStatsQuery,
  getAllUsersQuery,
  getAllStoresQuery
} from '../db/admin.queries.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const userCheck = await pool.query(getUserByEmailQuery, [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = role || 'USER';
    const newUser = await pool.query(createUserAdminQuery, [
      name,
      email,
      hashedPassword,
      address,
      userRole
    ]);

    res.status(201).json({
      message: 'User created successfully',
      user: newUser.rows[0]
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Server error while creating user' });
  }
};

export const createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    if (!name || !owner_id) {
      return res.status(400).json({ message: 'Name and owner_id are required' });
    }

    const newStore = await pool.query(createStoreQuery, [
      name,
      email,
      address,
      owner_id
    ]);

    res.status(201).json({
      message: 'Store created successfully',
      store: newStore.rows[0]
    });
  } catch (error) {
    console.error('Create store error:', error);
    res.status(500).json({ message: 'Server error while creating store' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await pool.query(getDashboardStatsQuery);
    res.status(200).json({
      message: 'Dashboard statistics retrieved',
      stats: stats.rows[0]
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error while fetching dashboard stats' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { sortBy } = req.query; // optional sort parameter
    const query = getAllUsersQuery(sortBy);
    
    const users = await pool.query(query);
    res.status(200).json({
      message: 'Users retrieved',
      users: users.rows
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const { sortBy } = req.query; // optional sort parameter
    const query = getAllStoresQuery(sortBy);
    
    const stores = await pool.query(query);
    res.status(200).json({
      message: 'Stores retrieved',
      stores: stores.rows
    });
  } catch (error) {
    console.error('Get all stores error:', error);
    res.status(500).json({ message: 'Server error while fetching stores' });
  }
};
