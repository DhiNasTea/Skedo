import React, { useState } from "react";
import supabase from "./supabase";

const ScheduleComponent = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [schedules, setSchedules] = useState([{}]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFetchSchedules = async () => {
    try {
      // Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_ANON_KEY' with your Supabase credentials

      let { data: schedules_all, error } = await supabase
        .from("schedules_all")
        .select("schedules");

      // Assuming the response data contains an array of schedules
      console.log(schedules_all);
      setSchedules(schedules_all);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  return (
    <div>
      <div className="form-row">
        <div className="col-md-4">
          <div className="mb-3 input-group">
            <label className="input-group-text form-label" htmlFor="name">
              Name:{" "}
            </label>
            <input
              className="custom-select"
              type="text"
              id="name"
              value={name}
              onChange={handleChangeName}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3 input-group">
            <label className="input-group-text form-label" htmlFor="password">
              Password:{" "}
            </label>
            <input
              className="custom-select"
              type="password"
              id="password"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
        </div>
        <button
          className="btn btn-primary fetch-sched-button"
          onClick={handleFetchSchedules}
        >
          Fetch Schedules
        </button>
      </div>

      {/* Render the fetched schedules here */}
      {/* <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>{schedule.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default ScheduleComponent;
