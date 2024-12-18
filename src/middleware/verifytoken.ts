import { NextFunction,Request,Response } from "express";
import  jwt  from "jsonwebtoken";

interface IPayload{
    _id:string;
    iat:number;
    exp:number;

}




export const verifyTokenMiddleware = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.header('auth-token');
  console.log("authHeader",authHeader);
  
   if (!authHeader) {
     res
      .status(401)
      .json({ message: "Token de acceso no proporcionado" });
      return;
  }
   const token = authHeader;

  try {
    //si no verifica salta una excepcion
   
    
    const decoded = jwt.verify(authHeader,'secretkey') as IPayload;
    console.log("decoded",decoded);
    
    //guardar en el usuario que se verificó ok
    //(req as RequestWithUser).user = decoded as UserIdentify;
    req.userId = decoded._id;

    next();
  } catch (error) {
    if(error instanceof Error)
      res.status(401).json({ message: error.message});
  }
};