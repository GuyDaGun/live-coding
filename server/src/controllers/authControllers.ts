import User, {UserType} from '../models/User.js';
import attachCookies from '../utils/attachCookies.js';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import {Request, Response} from 'express'
import { MyRequest } from '../types.js';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError('please provide all values');
  }

  const user: UserType | null = await User.findOne({ username });

  if (!user) {
    throw new UnAuthenticatedError('User not Authorized');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('User not Authorized');
  }
  
  const token = user.createJWT();

  attachCookies({ res, token });

  res.status(200).json({ user });
};

export const getCurrentUser = async (req: MyRequest, res: Response) => {
  const userId = req.user.userId;

  const user: UserType | null = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnAuthenticatedError('User not Authorized');
  }
  
  res.status(200).json({ user });
};

export const logout = (req: Request, res: Response) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: 'User Logged Out' });
};

export const getAllStudents = async (req: Request, res: Response) => {
  const students: UserType[] = await User.find({ isMentor: false });
  res.status(200).send(students);
}

export const validateUser = async (req: Request, res: Response) => {
  const {studentId} = req.body;

  const user = await User.findById(studentId);

  if (!user) {
    throw new UnAuthenticatedError('Invalid user id');
  }

  res.status(200).json({isValidUser: true, user });
}

