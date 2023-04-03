import React, { useState } from 'react';
import axios from 'axios';

interface TaskFormProps {
  onTaskCreated: (task: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim() === '') {
      alert('Please enter a task name');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/tasks', { name: taskName });
      onTaskCreated(response.data);
      setTaskName('');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskName">New Task</label><br/>
      <input
        type="text"
        id="taskName"
        name="taskName"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      /><br/><br/>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
