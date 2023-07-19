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

function createEventGrid(listOfEvents)
{
  let grid = Array(7);

  for (let i = 0; i < 7; i++)
  {
    grid[i] = Array(13).fill(0);
  }

  // populating the events in the grid
  let eventIDcount = 1;

  for (var j = 0; j < listOfEvents.length; j++)
  {
    let scheduleEvent = listOfEvents[j];

    let start = scheduleEvent.start;
    let end = scheduleEvent.end;
    let day = scheduleEvent.day;
    let name = scheduleEvent.name;

    for (let i = start; i < end; i++)
    {
      grid[day][i-8] = eventIDcount; 
    }

    eventIDcount++;
  }

  return grid;
}

function isTimeSlotEvent(day, hour, grid)
{
  // will return a color
  if (grid[day][hour-8] != 0)
  {
    return getItemColor(grid[day][hour-8]);
  }
  else 
  {
    return "#FFFFFF";
  }
}

function getItemColor(itemId) {
  // Generate a unique color based on the item ID
  const hue = itemId * 137.508; // Use a prime number for a more random distribution
  const saturation = 70; // Adjust the saturation as needed
  const lightness = 50; // Adjust the lightness as needed

  // Convert HSL color to RGB
  const h = hue % 360;
  const s = saturation / 100;
  const l = lightness / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r, g, b;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  // Convert RGB to hex
  const rgbToHex = (value) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hexColor = `#${rgbToHex(r + m)}${rgbToHex(g + m)}${rgbToHex(b + m)}`;
  return hexColor;
}

function Schedules() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const daysNum = Array.from({ length: 7 }, (_, i) => i);
  const hours = Array.from({ length: 13 }, (_, i) => i);

  // temporarely creating the event list here
  var event1 = new ScheduleEvent("value should be equal to 32", 9, 12, 0);
  var event2 = new ScheduleEvent("value should be equal to 22", 14, 16, 3);
  var event3 = new ScheduleEvent("value should be equal to 15", 18, 21, 4);
  var event4 = new ScheduleEvent("value should be equal to 0, invalid",7,12,2);
  var event5 = new ScheduleEvent("value should be equal to 0", 14, 14, 4);

  var eventList = [event1, event2, event3, event4, event5];

  let colorGrid = createEventGrid(eventList);
  console.log(colorGrid);

  // testUpdateSchedules();

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
                  <div id={`${day}-${hour+8}`} key={`${day}-${hour+8}`} className="hour-slot" style={{backgroundColor: isTimeSlotEvent(day, hour+8, colorGrid)}}>
                    {"-"}
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
