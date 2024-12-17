import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/test', {  
    
  

  }).then(() => {
    console.log('Connected to database');
    }).catch((error) => {
    console.log(error);
        
    });
export default mongoose;