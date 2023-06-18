import jwt from 'jsonwebtoken';
import { Response, NextFunction} from 'express'
import { MyRequest } from '../types.js';

const auth = async (req: MyRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId };

    next();

  } catch (error) {
    return res.status(401).json({ msg: 'User not authorized' });
  }
};

export default auth;