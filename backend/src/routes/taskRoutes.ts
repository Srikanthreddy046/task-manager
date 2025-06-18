import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';

const router = Router();
const taskRepo = AppDataSource.getRepository(Task);

router.get('/tasks', async (_, res) => {
  const tasks = await taskRepo.find();
  res.json(tasks);
});

router.post('/tasks', async (req, res) => {
  const task = taskRepo.create(req.body);
  const result = await taskRepo.save(task);
  res.status(201).json(result);
});

router.put('/tasks/:id', async (req, res) => {
  const task = await taskRepo.findOneBy({ id: req.params.id });
  if (!task) return res.status(404).send('Task not found');
  taskRepo.merge(task, req.body);
  const result = await taskRepo.save(task);
  res.json(result);
});

router.delete('/tasks/:id', async (req, res) => {
  const result = await taskRepo.delete(req.params.id);
  res.status(204).send();
});

export default router;