import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, password: string) => {
  const secretKey: string = process.env.SECRET_KEY || "";
  console.log(secretKey);
  const payload = {
    userId,
    password
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};