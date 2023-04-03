import React, { useState } from "react";
import { Task } from "../App";

interface TaskItemProps {
  task: Task;
  onEdit: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string, completed: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.name);

  const handleComplete = () => {
    onComplete(task._id, !task.completed);
  };

  const handleSave = () => {
    if (taskName.trim()) {
      onEdit({ ...task, name: taskName });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(task._id);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleComplete}
      />
      {isEditing ? (
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{task.name}</span>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
