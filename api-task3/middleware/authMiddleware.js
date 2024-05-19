// middleware/authMiddleware.js
import { verifyToken } from '../utils/auth.js';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt; 
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  req.user = decoded;
  next();
};

export default authMiddleware;
