// middleware/isAdmin.js
const isAdmin = (req, res, next) => {
    if (req.user.role === 'ADMIN') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Admins only' });
    }
  };
  
  module.exports = isAdmin;
  