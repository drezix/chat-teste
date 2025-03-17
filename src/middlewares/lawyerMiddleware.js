const lawyerMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
      return next();
  } else {
      return res.status(403).json({ msg: 'Access denied, only for lawyers' });
  }
};

module.exports = lawyerMiddleware;