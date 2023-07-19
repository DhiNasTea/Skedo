import React, { useState } from "react";
import { Task, WeekDay, Filter, scheduleTasks } from "./Scheduling";
const generateTimeOptions = () => {
  const options = [];
  for (let hour = 8; hour <= 21; hour++) {
    options.push(`${hour.toString().padStart(2, "0")}:00`);
  }
  return options;
};

const Options = () => {
  const [schedule, setSchedule] = useState({
    Monday: { checked: false, startTime: "", endTime: "" },
    Tuesday: { checked: false, startTime: "", endTime: "" },
    Wednesday: { checked: false, startTime: "", endTime: "" },
    Thursday: { checked: false, startTime: "", endTime: "" },
    Friday: { checked: false, startTime: "", endTime: "" },
    Saturday: { checked: false, startTime: "", endTime: "" },
    Sunday: { checked: false, startTime: "", endTime: "" },
  });

  const handleCheckboxChange = (day) => (event) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        checked: event.target.checked,
      },
    });
  };

  const handleStartTimeChange = (day) => (event) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        startTime: event.target.value,
      },
    });
  };

  const handleEndTimeChange = (day) => (event) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        endTime: event.target.value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Schedule:", schedule);
    //Add your submission logic here, e.g., send data to the server, etc.
    runner(createFilterObject(schedule));
  };

  const timeOptions = generateTimeOptions();

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="h4">Filters</h4>
      <p>Select the days and times you want to work:</p>
      {Object.entries(schedule).map(
        ([day, { checked, startTime, endTime }]) => (
          <div key={day} className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={checked}
              onChange={handleCheckboxChange(day)}
              id={`${day}-checkbox`}
            />
            <label className="form-check-label" htmlFor={`${day}-checkbox`}>
              {day}
            </label>
            {checked && (
              <div className="form-row">
                <div className="col-md-4">
                  <div className="mb-3 input-group">
                    <label className="input-group-text form-label">
                      Start Time:
                    </label>
                    <select
                      className="custom-select"
                      value={startTime}
                      onChange={handleStartTimeChange(day)}
                    >
                      <option value="">Select start time</option>
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3 input-group">
                    <label className="input-group-text form-label">
                      End Time:
                    </label>
                    <select
                      className="custom-select"
                      value={endTime}
                      onChange={handleEndTimeChange(day)}
                    >
                      <option value="">Select end time</option>
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}
      <button type="submit" className="btn btn-primary">
        Go to Schedules
      </button>
    </form>
  );
};

//uncomment after the implementation for Schedule.js is merged

const createFilterObject = (options) => {
  const days = Object.keys(options);
  days.forEach((day) => {
    options[day].startTime = parseInt(options[day].startTime.split(":")[0], 10);
    options[day].endTime = parseInt(options[day].endTime.split(":")[0], 10);
  });

  var monday = new WeekDay(
    options.Monday.startTime,
    options.Monday.endTime,
    options.Monday.checked
  );
  var tuesday = new WeekDay(
    options.Tuesday.startTime,
    options.Tuesday.endTime,
    options.Tuesday.checked
  );
  var wednesday = new WeekDay(
    options.Wednesday.startTime,
    options.Wednesday.endTime,
    options.Wednesday.checked
  );
  var thursday = new WeekDay(
    options.Thursday.startTime,
    options.Thursday.endTime,
    options.Thursday.checked
  );
  var friday = new WeekDay(
    options.Friday.startTime,
    options.Friday.endTime,
    options.Friday.checked
  );
  var saturday = new WeekDay(
    options.Saturday.startTime,
    options.Saturday.endTime,
    options.Saturday.checked
  );
  var sunday = new WeekDay(
    options.Sunday.startTime,
    options.Sunday.endTime,
    options.Sunday.checked
  );

  var preferences = new Filter(
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  );

  return preferences;
};

function runner(filter) {
  console.log(filter);
  var taskArray = [new Task("smallest task", 3)];

  const test = scheduleTasks(taskArray, filter);
  console.log(test.listOfEvents);
  console.log(test.schedule);
}
//const filterObject = createFilterObject(options);

//console.log(filterObject);

export default Options;
