import { Request, Response } from 'express';
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signup = async(req:Request,res:Response) => {
   console.log(req.body);
   
   const {username,password,email} = req.body;
   const user:IUser = new User({
         username,
         password,
         email,
        
   });
   user.password = await user.encryptPassword(user.password);

   const savedUser = await user.save();
   const token:string = jwt.sign({_id:savedUser._id},'secretkey');
  res.header('auth-token', token).json(savedUser);
  return ;
}


export const signin = async (req:Request,res:Response) => {
   const user =  await User.findOne({email:req.body.email});
   if(!user){ 
     res.status(400).json('Email or password is wrong');
     return ;
   }else{
    console.log("passord en controller:",req.body.password);
    console.log("user",user );
    console.log("comaracion: ",bcrypt.compareSync(req.body.password, user.password));
    
   const correctPassword:boolean = bcrypt.compareSync(req.body.password, user.password); 
   if(!correctPassword){ 
   res.status(400).json('Invalid Password');
   return ;
   }
    
   
   }
    const token:string = jwt.sign({_id:user._id},'secretkey',{
        //expira en 24 horas
        expiresIn:60*60*24
    });
   res.header('auth-token', token).json(user); 
} 

export const profile = async(req:Request,res:Response) => {
   const user = await User.findById(req.userId);
    if(!user){ 
         res.status(404).json('No user found');
         return;
    }
    res.json(user);
}