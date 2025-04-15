import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export default function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded; // Attach decoded token info for later use if needed
    next();
  });
}
