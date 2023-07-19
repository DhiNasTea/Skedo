import "./Schedules.css";

function Schedules({ schedAndEventsList }) {
  //change the following two lines Dhiaa
  console.log("This is what is received by schedules tab");
  console.log(schedAndEventsList);
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

  return (
    <div className="bigDiv">
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
            {days.map((day) => (
              <div key={day} className="day-schedule">
                {hours.map((hour) => (
                  <div key={`${day}-${hour}`} className="hour-slot">
                    {/* Display your schedule data here */ "wasgud"}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedules;
