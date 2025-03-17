const jwt = require('jsonwebtoken');  

const authMiddleware = (req, res, next) => {
  const header = req.header('Authorization');

  if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = header.replace('Bearer ', '');

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (err) {
      return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;