import { element } from "prop-types";
import "./Schedules.css";
import { ScheduleEvent } from "./Scheduling";

function updateSchedules(listOfEvents)
{
  console.log("coloring was called");
  
  for (var j = 0; j < listOfEvents.length; j++)
  {
    let scheduleEvent = listOfEvents[j];

    let start = scheduleEvent.start;
    let end = scheduleEvent.end;
    let day = scheduleEvent.day;
    let name = scheduleEvent.name;

    for (let i = start; i < end; i++)
    {
      console.log("day: " + day + ", i: " + i);
      let currTimeSlot = document.getElementById(`${day}-${i}`);
      if (currTimeSlot)
        currTimeSlot.style.backgroundColor = "red";    
    }
  }
  

}

function testUpdateSchedules()
{
  var event1 = new ScheduleEvent("value should be equal to 32", 9, 12, 0);
  var event2 = new ScheduleEvent("value should be equal to 22", 14, 16, 3);
  var event3 = new ScheduleEvent("value should be equal to 15", 18, 21, 4);
  var event4 = new ScheduleEvent("value should be equal to 0, invalid",7,12,2);
  var event5 = new ScheduleEvent("value should be equal to 0", 14, 14, 4);

  var eventList = [event1, event2, event3, event4, event5];

  updateSchedules(eventList);
}

function Schedules() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const daysNum = Array.from({ length: 7 }, (_, i) => i);
  const hours = Array.from({ length: 13 }, (_, i) => i);

  testUpdateSchedules();

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
            {daysNum.map((day) => (
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
