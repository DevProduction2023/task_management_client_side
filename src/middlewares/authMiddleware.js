const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.authToken;

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = checkToken;

    if(req.user_role === "admin"  ){
      console.log(req.user_role);
    }
    next();
  } catch (err) {                     
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
