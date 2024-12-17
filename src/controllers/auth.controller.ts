import { Request, Response } from 'express';
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';

export const signup = async(req:Request,res:Response) => {
   console.log(req.body);
   
   const {username,password,email} = req.body;
   const user:IUser = new User({
         username,
         password,
         email
   });
   user.password = await user.encryptPassword(user.password);
   const savedUser = await user.save();
   const token:string = jwt.sign({_id:savedUser._id},'secretkey');
   res.header('auth-token', token).json(savedUser);
}
export const signin = (req:Request,res:Response) => {
    res.send('Signin');
}

export const profile = (req:Request,res:Response) => {
    res.send('Profile');
}