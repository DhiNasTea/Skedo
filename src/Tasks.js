import React, { useState } from "react";

const TasksTab = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDuration, setNewDuration] = useState("");

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleDurationChange = (event) => {
    setNewDuration(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask && newDuration) {
      const task = {
        name: newTask,
        duration: newDuration,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setNewDuration("");
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={handleTaskChange}
          placeholder="Task name"
        />
        <input
          type="text"
          value={newDuration}
          onChange={handleDurationChange}
          placeholder="Duration"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name} - {task.duration}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksTab;
