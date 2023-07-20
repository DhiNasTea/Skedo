import React, { useState, useEffect } from "react";
import "./Schedules.css";
import supabase from "./supabase";
import {
  createEventGrid,
  firstTimeSlotName,
  isTimeSlotEvent,
} from "./Schedules";

const ScheduleComponent = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [colorGrid, setColorGrid] = useState([]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFetchSchedules = async () => {
    try {
      let { data: usersData, error: usersError } = await supabase
        .from("Users")
        .select("*")
        .eq("user_name", name)
        .eq("password", password)
        .single();

      if (usersError) {
        throw new Error("Error fetching user data from the users table.");
      }

      if (usersData) {
        const userId = usersData.id;
        setUserId(userId);

        let { data: schedulesData, error: schedulesError } = await supabase
          .from("Schedules")
          .select("schedule_name, schedule_obj")
          .eq("user_id", userId);

        if (schedulesError) {
          throw new Error("Error fetching schedules from the schedules table.");
        }

        if (schedulesData) {
          setSchedules(schedulesData);
          const selectedSchedParsed = JSON.parse(schedulesData[0].schedule_obj);
          const grid = createEventGrid(selectedSchedParsed);
          setColorGrid(grid);
        }
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  //DHIA CODE TO DISPLAY SCHEDULE
  const daysNum = Array.from({ length: 7 }, (_, i) => i);
  //change the following two lines Dhiaa
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hours = Array.from({ length: 13 }, (_, i) => i);
  // const temp =
  //   '[{"name":"aarmin","start":14,"end":18,"day":0},{"name":"one","start":10,"end":11,"day":1}]';
  // let eventListTest = JSON.parse(temp);
  // let colorGrid = createEventGrid(eventListTest);
  // console.log(colorGrid);

  const handleSelectSchedule = (e) => {
    const selectedScheduleName = e.target.value;
    const selectedScheduleObj = schedules.find(
      (schedule) => schedule.schedule_name === selectedScheduleName
    )?.schedule_obj;

    setSelectedSchedule(selectedScheduleObj);
  };

  // Use useEffect to update the colorGrid state when a new schedule is selected
  useEffect(() => {
    if (selectedSchedule) {
      const selectedSchedParsed = JSON.parse(selectedSchedule);
      const grid = createEventGrid(selectedSchedParsed);
      setColorGrid(grid);
    } else {
      setColorGrid([]);
    }
  }, [selectedSchedule]);

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
          className="btn btn-primary custom-button"
          onClick={handleFetchSchedules}
        >
          Fetch Schedules
        </button>
      </div>
      <div>
        <label htmlFor="schedule-dropdown">Select Schedule:</label>
        <select
          id="schedule-dropdown"
          value={selectedSchedule}
          onChange={handleSelectSchedule}
        >
          <option value="">Select a schedule</option>
          {schedules.map((schedule) => (
            <option key={schedule.schedule_name} value={schedule.schedule_name}>
              {schedule.schedule_name}
            </option>
          ))}
        </select>
        {selectedSchedule && (
          <div>
            <h3>Schedule: {selectedSchedule}</h3>
            {/* Render the schedule_obj here */}
            {/* ... (You may use the 'selectedSchedule' value to get the corresponding schedule_obj from the state and display it) */}
            <div className="bigDiv" id="scheduleDiv"></div>
            <div className="row">
              <div className="hours"></div>
              <div className="weekdays">
                {days.map((day) => (
                  <div key={day} className="day">
                    {day}
                  </div>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="hours">
                {hours.map((hour) => (
                  <div key={hour} className="hour">
                    {hour + 8}:00
                  </div>
                ))}
              </div>
              <div className="week-schedule">
                <div className="schedule">
                  {daysNum.map((day) => (
                    <div key={day} className="day-schedule">
                      {hours.map((hour) => (
                        <div
                          id={`${day}-${hour + 8}`}
                          key={`${day}-${hour + 8}`}
                          className="hour-slot"
                          style={{
                            backgroundColor: isTimeSlotEvent(
                              day,
                              hour + 8,
                              colorGrid
                            ),
                          }}
                        >
                          {firstTimeSlotName(
                            day,
                            hour + 8,
                            colorGrid,
                            JSON.parse(selectedSchedule)
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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
