import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  name: string;
  completed: boolean;
  subtasks: ITask[];
}

const taskSchema: Schema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
