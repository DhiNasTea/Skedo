import React, { useState } from "react";
import Options from "./Options";
import Schedules from "./Schedules";
import SavedSchedules from "./SavedSchedules";
import Tasks from "./Tasks";
import Home from "./Home";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [tasks, setTasks] = useState([]);
  const [schedAndEventsList, setSchedAndEventsList] = useState(null);
  const [tasksSet, setTasksSet] = useState(false);

  const handleTabClick = (tab) => {
    if (tab === "schedules" && !schedAndEventsList) {
      return; // Prevent the Schedules tab from being active if schedAndEventsList is not set
    }

    setActiveTab(tab);
  };

  // Handles clicking next in the Tasks tab
  const handleNextClick = (tasksArray) => {
    setTasks(tasksArray);
    setTasksSet(true); // Mark tasks as set
    setActiveTab("options");
  };

  // Handles clicking Go to Schedules in the Options tab
  const handleGenerateSchedules = (schedList) => {
    setSchedAndEventsList(schedList);
    setActiveTab("schedules");
  };

  return (
    <div className="container">
      <nav className="nav nav-tabs">
        <a
          className={
            activeTab === "home"
              ? "active nav-item nav-link"
              : "nav-item nav-link"
          }
          onClick={() => handleTabClick("home")}
          href="#home"
          data-toggle="tab"
        >
          Home
        </a>
        <a
          className={
            activeTab === "tasks"
              ? "active nav-item nav-link"
              : "nav-item nav-link"
          }
          onClick={() => handleTabClick("tasks")}
          href="#tasks"
          data-toggle="tab"
        >
          Tasks
        </a>
        <a
          className={
            activeTab === "options"
              ? "active nav-item nav-link"
              : tasksSet // Check if tasks are set to enable the tab
              ? "nav-item nav-link"
              : "nav-item nav-link disabled" // Disable the tab visually if tasks are not set
          }
          onClick={() => handleTabClick("options")}
          data-toggle="tab"
          href="#options"
        >
          Options
        </a>
        <a
          className={
            activeTab === "schedules"
              ? "active nav-item nav-link"
              : schedAndEventsList
              ? "nav-item nav-link"
              : "nav-item nav-link disabled" // Disable the tab visually if schedAndEventsList is not set
          }
          onClick={() => handleTabClick("schedules")}
          data-toggle="tab"
          href="#schedules"
        >
          Schedules
        </a>
        <a
          className={
            activeTab === "saved_schedules"
              ? "active nav-item nav-link"
              : "nav-item nav-link"
          }
          onClick={() => handleTabClick("saved_schedules")}
          data-toggle="tab"
          href="#saved_schedules"
        >
          View Saved Schedules
        </a>
      </nav>
      <div className="tab-content">
        {activeTab === "home" && <Home />}
        {activeTab === "tasks" && <Tasks onHandleNextClick={handleNextClick} />}
        {activeTab === "options" && (
          <Options
            tasksArray={tasks}
            onHandleNextClick={handleGenerateSchedules}
          />
        )}
        {activeTab === "schedules" && (
          <Schedules
            className="schedules-tab"
            schedAndEventsList={schedAndEventsList}
          />
        )}
        {activeTab === "saved_schedules" && <SavedSchedules />}
      </div>
    </div>
  );
};

export default Tabs;
