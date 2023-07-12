import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // set JWT as HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // if not development but in production, then secure is true
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    sameSite: 'strict', // it will prevent attacks
  }); // 30 days
};
export default generateToken;
