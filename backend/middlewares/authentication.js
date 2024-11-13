const jwt = require("jsonwebtoken");
const  {JWT_SECRET}  = require("../config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // Use lowercase 'authorization'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        req.userId = decoded.userId;
        if (req.body.userId && req.body.userId !== decoded.userId) {
            throw new Error('Invalid user ID');
        }
        
        next();
    } catch (error) {
        res.status(401).json({
            error: 'Invalid request!'
        });
    }
};

module.exports = authMiddleware;
