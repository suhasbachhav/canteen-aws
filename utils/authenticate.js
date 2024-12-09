import jwt from 'jsonwebtoken'; 

const authenticate = async function (req, res, next) {
    const token = req.headers.token;
    try {
        jwt.verify(token, 'q2w3e4r5t6y7u8i9');
        next();
    } catch(err) {
        res.status(404).json({ message: 'Token Expired. Please login again' })
    }
}



export default authenticate;