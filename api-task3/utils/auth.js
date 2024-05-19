// utils/auth.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Generate JWT Token
export const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};

// Verify JWT Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
};

// Hash Password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare Password
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
