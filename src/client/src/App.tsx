import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';


export interface Task {
  _id: string;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tasks');
        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (task: Task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
    setFilteredTasks((prevTasks) => [task, ...prevTasks]);
  };

  const handleEdit = (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    setFilteredTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  };

  const handleDelete = async (taskId: string) => {
    await axios.delete(`http://localhost:3001/api/tasks/${taskId}`);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    setFilteredTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const handleComplete = async (taskId: string, completed: boolean) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/tasks/${taskId}`, { completed });
      const updatedTask = response.data;
      setTasks((prevTasks) => prevTasks.map((task) => (task._id === taskId ? updatedTask : task)));
      setFilteredTasks((prevTasks) => prevTasks.map((task) => (task._id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error('Error updating task completion status:', error);
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm) {
      const filtered = tasks.filter((task) => task.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <SearchBar onSearch={handleSearch} /><br/>
      <TaskForm onTaskCreated={handleTaskCreated} /><br/>
      <TaskList tasks={filteredTasks} onEdit={handleEdit} onDelete={handleDelete} onComplete={handleComplete} />
    </div>
  );  
};

export default App;
