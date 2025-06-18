import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import taskRoutes from './routes/taskRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(taskRoutes);

AppDataSource.initialize().then(() => {
  app.listen(4000, () => console.log('Server running on http://localhost:4000'));
});