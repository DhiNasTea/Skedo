import "./Schedules.css";

export function updateSchedules(listOfEvents)
{
  for (let scheduleEvent in listOfEvents)
  {
    let start = scheduleEvent.start;
    let end = scheduleEvent.end;
    let day = scheduleEvent.day;
    let name = scheduleEvent.name;

    for (let i = start; i < end; i++)
    {
      let currTimeSlot = document.getElementById(`${day}-${i}`);
      currTimeSlot.style.backgroundColor = "red";    

    }
  }

}

function Schedules() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from({ length: 13 }, (_, i) => i);

  return (
    <div className="bigDiv" id="scheduleDiv">
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
              {hour+8}:00
            </div>
          ))}
        </div>
        <div className="week-schedule">
          <div className="schedule">
            {days.map((day) => (
              <div key={day} className="day-schedule">
                {hours.map((hour) => (
                  <div id={`${day}-${hour+8}`} key={`${day}-${hour+8}`} className="hour-slot">
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
};

export default Schedules;
