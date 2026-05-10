export const checkRole = (roles) => {
  return (req, res, next) => {
    // req.user is set by the auth.middleware
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

// Convenience middleware functions
export const isAdmin = checkRole(['ADMIN']);
export const isUser = checkRole(['USER', 'ADMIN']); // Usually admins can do what users do
export const isStoreOwner = checkRole(['STORE_OWNER', 'ADMIN']);
