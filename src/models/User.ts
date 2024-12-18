import {Schema,model,Document} from 'mongoose';
import bcrypt from 'bcryptjs';
export interface IUser extends Document{
    username:string;
    password:string;
    email:string;
    encryptPassword(password:string):Promise<string>;
    validatePassword(password:string):Promise<boolean>;
}

const userSchema = new Schema ({
    username:{
        type:String,
        required:true,
      
        lowercase:true
    },
    password:{
        type:String,
        required:true
       
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    }
});
userSchema.methods.encryptPassword = async(password:string):Promise<string> => {
   
    return await bcrypt.hash(password,10);
}

userSchema.methods.validatePassword = async function(password:string){

    const result =  bcrypt.compare(password,this.password,(err,res) => {
        console.log("res",res);
        console.log("err",err);
        
        
        return res;
    });
   
    
   
}
export default model<IUser>('User',userSchema);