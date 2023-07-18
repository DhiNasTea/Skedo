import React, { useState } from "react";

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 8; hour <= 22; hour++) {
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
    // Add your submission logic here, e.g., send data to the server, etc.
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

export default Options;
