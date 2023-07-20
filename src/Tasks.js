import React, { useState } from "react";
import { Task } from "./Scheduling";

const TasksTab = ({ onHandleNextClick }) => {
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
    let croppedVariable = newTask;
    if (newTask.length > 13) {
      croppedVariable = newTask.slice(0, 13);
    }
    if (newTask && newDuration) {
      const task = {
        name: croppedVariable,
        duration: newDuration,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setNewDuration("");
    }
  };

  const handleNext = () => {
    const taskObjects = tasks.map(
      (task) => new Task(task.name, parseInt(task.duration))
    );
    console.log("Array of Task objects:", taskObjects);
    // Add logic for handling the "Next" button right here
    // Call the callback function to pass the array of Task objects to the Tabs component
    onHandleNextClick(taskObjects);
    console.log("Next button clicked");
  };

  // Style objects for the elements
  const inputStyle = {
    padding: "8px",
    marginRight: "10px",
    border: "1px solid #ccc",
  };

  const selectStyle = {
    padding: "8px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const addButtonStyle = {
    padding: "8px 16px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const nextButtonStyle = {
    padding: "10px 20px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
  };

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        <input
          type="text"
          placeholder="Task name"
          value={newTask}
          onChange={handleTaskChange}
          style={inputStyle}
        />
        <select
          value={newDuration}
          onChange={handleDurationChange}
          style={selectStyle}
        >
          <option value="">Select duration</option>
          <option value="1">1 hour</option>
          <option value="2">2 hours</option>
          <option value="3">3 hours</option>
          <option value="4">4 hours</option>
          <option value="5">5 hours</option>
          {/* Add more duration options as needed */}
        </select>
        <button onClick={handleAddTask} style={addButtonStyle}>
          Add Task
        </button>
      </div>
      <div>
        {tasks.map((task, index) => (
          <div key={index} style={{ margin: "5px 0" }}>
            <span>{task.name}</span> -{" "}
            <span>
              {task.duration} {task.duration === "1" ? "hour" : "hours"}
            </span>
          </div>
        ))}
      </div>
      <button onClick={handleNext} style={nextButtonStyle}>
        Next
      </button>
    </div>
  );
};

export default TasksTab;
