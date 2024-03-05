import { NextFunction, Request, Response } from 'express';
import bcrypt from  'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Todo from '../models/ToDo';
import { errorHandler } from '../utils/error';


//Register User
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  {
      username,
      password,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error:any) {
    console.log(error)
    next(error);
  }
};

//Login User
export const login = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return next(errorHandler('404', 'User not found!'));

    const isMatch =  await bcrypt.compare(password, user.password);
    if (!isMatch) return next(errorHandler('401', 'Wrong credentials!'));

    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET!);
    user.password = '';
    const currentUser = user._doc;
    res.status(200).json({ token, currentUser });
  } catch (error:any) {
    next(error);
  }
};

//Logout User
export const signout = async(req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('You have logged out!')
  } catch (error:any) {
    next(error);
  }
};

//Delete User and users ToDos
export const deleteUser = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    await Todo.deleteMany({author: userId});
    res.clearCookie('access_token');
    res.status(200).json('User deleted!')
  } catch (error:any) {
    next(error);
  }
};