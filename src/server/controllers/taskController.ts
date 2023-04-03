import { Request, Response } from 'express';
import Task, { ITask } from '../models/taskModel';

export const createTask = async (req: Request, res: Response) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
};

export const getTask = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndRemove(req.params.taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json({ message: 'Task deleted' });
};
