import { useState } from "react";
import Options from "./Options";
import Schedules from "./Schedules";
import Tasks from "./Tasks";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tasks");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="container">
      <ul className="nav nav-tabs">
        <li
          className={activeTab === "tasks" ? "active" : ""}
          onClick={() => handleTabClick("tasks")}
        >
          <a data-toggle="tab" href="#tasks">
            Tasks
          </a>
        </li>
        <li
          className={activeTab === "options" ? "active" : ""}
          onClick={() => handleTabClick("options")}
        >
          <a data-toggle="tab" href="#options">
            Options
          </a>
        </li>
        <li
          className={activeTab === "schedules" ? "active" : ""}
          onClick={() => handleTabClick("schedules")}
        >
          <a data-toggle="tab" href="#schedules">
            Schedules
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === "tasks" && <Tasks />}
        {activeTab === "options" && <Options />}
        {activeTab === "schedules" && <Schedules />}
      </div>
    </div>
  );
};

export default Tabs;
