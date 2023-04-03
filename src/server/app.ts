import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

const mongodbLink: string = 'mongodb+srv://idansharon14:idan1453@todo.hwwczfs.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(mongodbLink)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
