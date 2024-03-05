import express, { NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from '../routes/authRoutes';
import toDoRoutes from '../routes/toDoRoutes';


const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', toDoRoutes);


const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));


app.use((error: any, req: express.Request, res: express.Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});


