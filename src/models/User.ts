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
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    }
});
userSchema.methods.encryptPassword = async(password:string):Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

userSchema.methods.validatePassword = async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password,this.password);
}
export default model<IUser>('User',userSchema);