import { useState } from "react";
import Options from "./Options";
import Schedules from "./Schedules";
import SavedSchedules from "./SavedSchedules";
import Tasks from "./Tasks";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tasks");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="container">
      <nav className="nav nav-tabs">
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
              : "nav-item nav-link"
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
              : "nav-item nav-link"
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
        {activeTab === "tasks" && <Tasks />}
        {activeTab === "options" && <Options />}
        {activeTab === "schedules" && <Schedules />}
        {activeTab === "saved_schedules" && <SavedSchedules />}
      </div>
    </div>
  );
};

export default Tabs;
