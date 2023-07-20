import React, { useState, useEffect } from "react";
import "./Schedules.css";
import supabase from "./supabase";
import {
  createEventGrid,
  firstTimeSlotName,
  isTimeSlotEvent,
} from "./Schedules";

const fetchUserData = async (name, password) => {
  try {
    let { data: userData, error: userError } = await supabase
      .from("Users")
      .select("*")
      .eq("user_name", name)
      .eq("password", password)
      .single();

    if (userError) {
      throw new Error("Error fetching user data from the users table.");
    }

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const fetchSchedules = async (userId) => {
  try {
    let { data: schedulesData, error: schedulesError } = await supabase
      .from("Schedules")
      .select("schedule_name, schedule_obj")
      .eq("user_id", userId);

    if (schedulesError) {
      throw new Error("Error fetching schedules from the schedules table.");
    }

    return schedulesData;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return null;
  }
};

const ScheduleComponent = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [schedulesFetched, setSchedulesFetched] = useState(false); // New state for tracking schedule fetch

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFetchSchedules = async () => {
    try {
      const userData = await fetchUserData(name, password);

      if (userData) {
        const userId = userData.id;
        setUserId(userId);

        const schedulesData = await fetchSchedules(userId);

        if (schedulesData) {
          setSchedules(schedulesData);
          const schedulesDataWithGrid = schedulesData.map((schedule) => {
            const scheduleObj = JSON.parse(schedule.schedule_obj);
            const grid = createEventGrid(scheduleObj);
            return {
              ...schedule,
              grid,
            };
          });
          setScheduleData(schedulesDataWithGrid);
          setSchedulesFetched(true); // Set schedulesFetched to true after schedules are fetched
        }
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    if (selectedSchedule) {
      let grid = createEventGrid(JSON.parse(selectedSchedule.schedule_obj));
      setSelectedSchedule((prevSchedule) => ({
        ...prevSchedule,
        grid,
      }));
    }
  }, [selectedSchedule]);

  const daysNum = Array.from({ length: 7 }, (_, i) => i);
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

  const handleSelectSchedule = (e) => {
    const selectedScheduleName = e.target.value;
    const selectedScheduleData = scheduleData.find(
      (schedule) => schedule.schedule_name === selectedScheduleName
    );
    setSelectedSchedule(selectedScheduleData);
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
          className="btn btn-primary custom-button"
          onClick={handleFetchSchedules}
        >
          Fetch Schedules
        </button>
      </div>
      {schedulesFetched && ( // Render the dropdown only if schedules are fetched
        <div>
          <label htmlFor="schedule-dropdown">Select Schedule:</label>
          <select
            id="schedule-dropdown"
            value={selectedSchedule ? selectedSchedule.schedule_name : ""}
            onChange={handleSelectSchedule}
          >
            <option value="">Select a schedule</option>
            {schedules.map((schedule) => (
              <option
                key={schedule.schedule_name}
                value={schedule.schedule_name}
              >
                {schedule.schedule_name}
              </option>
            ))}
          </select>
          {selectedSchedule ? (
            <div>
              <h3>Schedule: {selectedSchedule.schedule_name}</h3>
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
                                selectedSchedule.grid
                              ),
                            }}
                          >
                            {firstTimeSlotName(
                              day,
                              hour + 8,
                              selectedSchedule.grid,
                              JSON.parse(selectedSchedule.schedule_obj)
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>No schedule selected.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleComponent;
