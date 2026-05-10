export const getOwnerDashboardQuery = `
  SELECT 
    s.id as store_id,
    s.name as store_name,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as total_ratings
  FROM stores s
  LEFT JOIN ratings r ON s.id = r.store_id
  WHERE s.owner_id = $1
  GROUP BY s.id, s.name;
`;

export const getOwnerRatingsQuery = `
  SELECT 
    r.id as rating_id,
    r.rating,
    r.created_at,
    u.name as user_name,
    u.email as user_email,
    s.name as store_name
  FROM ratings r
  JOIN users u ON r.user_id = u.id
  JOIN stores s ON r.store_id = s.id
  WHERE s.owner_id = $1
  ORDER BY r.created_at DESC;
`;
