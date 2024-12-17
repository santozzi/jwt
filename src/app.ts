import express, {Application} from 'express';
import authRoutes from './routes/auth';
import morgan from 'morgan';
import cors from 'cors';

const app:Application = express();
//middlewares
app.use(express.json());
app.set("port", 3000);
app.use('/api/auth/',authRoutes);


app.use(morgan('dev'));
app.use(cors());
export default app;