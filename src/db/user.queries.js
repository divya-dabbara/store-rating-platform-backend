export const getStoresWithRatingsQuery = (searchQuery) => {
  let query = `
    SELECT 
      s.id,
      s.name, 
      s.address, 
      s.email,
      COALESCE(AVG(r.rating), 0) as average_rating,
      ur.rating as user_rating,
      ur.id as rating_id
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    LEFT JOIN ratings ur ON s.id = ur.store_id AND ur.user_id = $1
  `;

  if (searchQuery) {
    query += ` WHERE s.name ILIKE $2 OR s.address ILIKE $2`;
  }

  query += ` GROUP BY s.id, s.name, s.address, s.email, ur.rating, ur.id ORDER BY s.name ASC;`;
  
  return query;
};

export const createRatingQuery = `
  INSERT INTO ratings (user_id, store_id, rating)
  VALUES ($1, $2, $3)
  RETURNING id, user_id, store_id, rating, created_at;
`;

export const checkExistingRatingQuery = `
  SELECT id FROM ratings WHERE user_id = $1 AND store_id = $2;
`;

export const updateRatingQuery = `
  UPDATE ratings 
  SET rating = $1 
  WHERE id = $2 AND user_id = $3
  RETURNING id, user_id, store_id, rating, created_at;
`;
