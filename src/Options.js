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

  const anyCheckboxSelected = () => {
    return Object.values(schedule).some(
      (day) => day.checked && day.startTime && day.endTime
    );
  };

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
    console.log("This is waht user submitted Schedule:");
    console.log(schedule);
    //Add your submission logic here, e.g., send data to the server, etc.
    let filterObject = createFilterObject(schedule);
    console.log(filterObject);
    runner(filterObject);
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
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!anyCheckboxSelected()}
      >
        Go to Schedules
      </button>
    </form>
  );
};

//uncomment after the implementation for Schedule.js is merged

const createFilterObject = (options) => {
  const days = Object.keys(options);

  var monday = new WeekDay(
    parseInt(options.Monday.startTime.split(":")[0], 10),
    parseInt(options.Monday.endTime.split(":")[0], 10),
    options.Monday.checked
  );
  var tuesday = new WeekDay(
    parseInt(options.Tuesday.startTime.split(":")[0], 10),
    parseInt(options.Tuesday.endTime.split(":")[0], 10),
    options.Tuesday.checked
  );
  var wednesday = new WeekDay(
    parseInt(options.Wednesday.startTime.split(":")[0], 10),
    parseInt(options.Wednesday.endTime.split(":")[0], 10),
    options.Wednesday.checked
  );
  var thursday = new WeekDay(
    parseInt(options.Thursday.startTime.split(":")[0], 10),
    parseInt(options.Thursday.endTime.split(":")[0], 10),
    options.Thursday.checked
  );
  var friday = new WeekDay(
    parseInt(options.Friday.startTime.split(":")[0], 10),
    parseInt(options.Friday.endTime.split(":")[0], 10),
    options.Friday.checked
  );
  var saturday = new WeekDay(
    parseInt(options.Saturday.startTime.split(":")[0], 10),
    parseInt(options.Saturday.endTime.split(":")[0], 10),
    options.Saturday.checked
  );
  var sunday = new WeekDay(
    parseInt(options.Sunday.startTime.split(":")[0], 10),
    parseInt(options.Sunday.endTime.split(":")[0], 10),
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
  var taskArray = [new Task("smallest task", 3)];

  const test = scheduleTasks(taskArray, filter);
  console.log(test.listOfEvents);
  console.log(test.schedule);
}
//const filterObject = createFilterObject(options);

//console.log(filterObject);

export default Options;
