export const createUserAdminQuery = `
  INSERT INTO users (name, email, password, address, role)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id, name, email, address, role, created_at;
`;

export const createStoreQuery = `
  INSERT INTO stores (name, email, address, owner_id)
  VALUES ($1, $2, $3, $4)
  RETURNING id, name, email, address, owner_id, created_at;
`;

export const getDashboardStatsQuery = `
  SELECT 
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM stores) as total_stores,
    (SELECT COUNT(*) FROM ratings) as total_ratings;
`;

export const getAllUsersQuery = (sortBy) => {
  const allowedSortColumns = ['name', 'email', 'address'];
  const sortCol = allowedSortColumns.includes(sortBy) ? sortBy : 'id';
  return `SELECT id, name, email, address, role FROM users ORDER BY ${sortCol} ASC;`;
};

export const getAllStoresQuery = (sortBy) => {
  const allowedSortColumns = ['name', 'email', 'address'];
  const sortCol = allowedSortColumns.includes(sortBy) ? sortBy : 'id';
  return `
    SELECT 
      s.name, 
      s.email, 
      s.address, 
      COALESCE(AVG(r.rating), 0) as average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id, s.name, s.email, s.address
    ORDER BY s.${sortCol} ASC;
  `;
};
