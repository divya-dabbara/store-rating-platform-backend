export const createUserQuery = `
  INSERT INTO users (name, email, password, address, role)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id, name, email, address, role, created_at;
`;

export const getUserByEmailQuery = `
  SELECT * FROM users WHERE email = $1;
`;
