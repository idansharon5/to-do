import React from 'react';
import { Task } from '../App';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onEdit: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string, completed: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onComplete }) => {
  return (
    <div>

      {/* filter completed */}
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} onComplete={onComplete} />
      ))}
    </div>
    
  );
};

export default TaskList;
